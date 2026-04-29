import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/components/PrimaryButton';
import Button from '@/components/Button';

export default function Welcome({ canLogin, canRegister, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-2xl text-center p-8">
                    <h1 className="text-4xl font-extrabold">Welcome to AsuraTech</h1>

                    <p className="mt-4 text-gray-600">A Laravel + Inertia + React starter template with RTK Query.</p>

                    <div className="mt-6 flex justify-center gap-3">
                        {canLogin && (
                            <Link href={route('login')}>
                                <PrimaryButton>Log in</PrimaryButton>
                            </Link>
                        )}

                        {canRegister && (
                            <Link href={route('register')}>
                                <Button variant="secondary">Register</Button>
                            </Link>
                        )}
                    </div>

                    <div className="mt-8 text-sm text-gray-500">
                        <div>Laravel {laravelVersion}</div>
                        <div>PHP {phpVersion}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

Welcome.layout = (page) => <GuestLayout>{page}</GuestLayout>;
