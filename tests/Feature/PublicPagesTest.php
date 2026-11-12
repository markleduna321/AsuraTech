<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    public function test_demo_portal_and_legal_pages_render(): void
    {
        $pages = [
            '/demos' => 'demo-portal/page',
            '/privacy' => 'legal/privacy/page',
            '/terms' => 'legal/terms/page',
        ];

        foreach ($pages as $url => $component) {
            $this->get($url)
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page->component($component));
        }
    }
}
