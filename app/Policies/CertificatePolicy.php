<?php

namespace App\Policies;

use App\Models\Certificate;
use App\Models\User;

class CertificatePolicy
{
    /**
     * Determine if the user can view the list of certificates.
     */
    public function viewAny(User $user): bool
    {
        return true; // Any authenticated user can view the list
    }

    /**
     * Determine if the user can view a specific certificate.
     * Public access — no auth required. This is handled at the route level
     * by omitting auth middleware on the show endpoint.
     */
    public function view(?User $user, Certificate $certificate): bool
    {
        return true; // Public access for QR verification
    }

    /**
     * Determine if the user can create certificates.
     */
    public function create(User $user): bool
    {
        return true; // Any authenticated user can create
    }

    /**
     * Determine if the user can update a certificate.
     */
    public function update(User $user, Certificate $certificate): bool
    {
        return true; // Any authenticated user can update
    }

    /**
     * Determine if the user can delete a certificate.
     */
    public function delete(User $user, Certificate $certificate): bool
    {
        return true; // Any authenticated user can delete
    }
}
