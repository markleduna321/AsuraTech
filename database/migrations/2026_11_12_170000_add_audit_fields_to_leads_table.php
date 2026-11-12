<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->string('business_type', 50)->nullable()->after('company');
            $table->string('source', 50)->nullable()->after('service_interest');
            $table->string('utm_source', 100)->nullable()->after('source');
            $table->string('utm_medium', 100)->nullable()->after('utm_source');
            $table->string('utm_campaign', 100)->nullable()->after('utm_medium');
            $table->string('utm_term', 100)->nullable()->after('utm_campaign');
            $table->string('utm_content', 100)->nullable()->after('utm_term');
            $table->timestamp('consented_at')->nullable()->after('status');

            $table->index('source');
        });
    }

    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropIndex(['source']);
            $table->dropColumn([
                'business_type',
                'source',
                'utm_source',
                'utm_medium',
                'utm_campaign',
                'utm_term',
                'utm_content',
                'consented_at',
            ]);
        });
    }
};
