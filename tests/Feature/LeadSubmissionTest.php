<?php

namespace Tests\Feature;

use App\Mail\LeadConfirmationMail;
use App\Mail\NewLeadMail;
use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class LeadSubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
    }

    private function auditPayload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Ana Cruz',
            'email' => 'ana@example.com',
            'business_type' => 'fitness',
            'service_interest' => 'audit',
            'source' => 'hero',
            'utm_source' => 'google',
            'utm_campaign' => 'spring',
            'requirements' => 'Manual member billing',
            'consent' => true,
            'website' => '',
        ], $overrides);
    }

    public function test_audit_request_is_stored_with_attribution_and_consent(): void
    {
        $this->postJson('/api/leads', $this->auditPayload())->assertCreated();

        $lead = Lead::sole();
        $this->assertSame('fitness', $lead->business_type);
        $this->assertSame('hero', $lead->source);
        $this->assertSame('google', $lead->utm_source);
        $this->assertSame('spring', $lead->utm_campaign);
        $this->assertNotNull($lead->consented_at);

        Mail::assertSent(NewLeadMail::class);
        Mail::assertSent(LeadConfirmationMail::class, fn ($mail) => $mail->hasTo('ana@example.com'));
    }

    public function test_audit_request_requires_business_type_and_consent(): void
    {
        $this->postJson('/api/leads', $this->auditPayload(['business_type' => null, 'consent' => false]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['business_type', 'consent']);

        $this->assertDatabaseCount('leads', 0);
    }

    public function test_filled_honeypot_is_rejected(): void
    {
        $this->postJson('/api/leads', $this->auditPayload(['website' => 'http://spam.test']))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['website']);

        $this->assertDatabaseCount('leads', 0);
    }

    public function test_chat_leads_do_not_need_consent_or_business_type(): void
    {
        $this->postJson('/api/leads', [
            'name' => 'Ben',
            'email' => 'ben@example.com',
            'service_interest' => 'web',
        ])->assertCreated();

        $this->assertNull(Lead::sole()->consented_at);
    }

    public function test_submissions_are_rate_limited_per_ip(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/leads', $this->auditPayload(['email' => "lead{$i}@example.com"]))->assertCreated();
        }

        $this->postJson('/api/leads', $this->auditPayload())->assertStatus(429);
    }
}
