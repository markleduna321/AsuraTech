<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Georgia&display=swap');
    </style>
</head>
<body class="bg-white flex items-center justify-center min-h-screen" style="margin: 0; padding: 0; background: transparent;">

    <div class="relative w-[1200px] h-[850px] bg-white rounded-[2rem] overflow-hidden shadow-2xl">
        
        <!-- BACKGROUND DECORATIONS -->
        <!-- Top-left geometric blue accent -->
        <div class="absolute top-0 left-0 w-64 h-64 pointer-events-none">
            <div class="absolute top-0 left-0 w-full h-full">
                <div class="absolute top-0 left-0 w-48 h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <div class="absolute top-0 left-0 w-2 h-48 bg-gradient-to-b from-blue-600 to-blue-400"></div>
                <div class="absolute top-6 left-6 w-32 h-1 bg-blue-500/40 rotate-45 origin-left"></div>
                <div class="absolute top-4 left-10 w-24 h-24 border-l-4 border-t-4 border-blue-500/30 rounded-tl-xl"></div>
            </div>
            <svg class="absolute top-0 left-0 w-56 h-56 opacity-70" viewBox="0 0 140 140">
                <polygon points="0,0 120,0 0,120" fill="url(#blueGrad1)" />
                <polygon points="0,0 80,0 0,80" fill="url(#blueGrad2)" />
                <polygon points="0,0 45,0 0,45" fill="url(#blueGrad3)" />
                <defs>
                    <linearGradient id="blueGrad1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#1e40af" stop-opacity="0.15" />
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
                    </linearGradient>
                    <linearGradient id="blueGrad2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#1e40af" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.08" />
                    </linearGradient>
                    <linearGradient id="blueGrad3" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#1e40af" stop-opacity="0.4" />
                        <stop offset="100%" stop-color="#2563eb" stop-opacity="0.15" />
                    </linearGradient>
                </defs>
            </svg>
        </div>

        <!-- Bottom-right geometric blue accent -->
        <div class="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
            <div class="absolute bottom-0 right-0 w-full h-full">
                <div class="absolute bottom-0 right-0 w-48 h-2 bg-gradient-to-l from-blue-600 to-blue-400"></div>
                <div class="absolute bottom-0 right-0 w-2 h-48 bg-gradient-to-t from-blue-600 to-blue-400"></div>
                <div class="absolute bottom-4 right-10 w-24 h-24 border-r-4 border-b-4 border-blue-500/30 rounded-br-xl"></div>
            </div>
            <svg class="absolute bottom-0 right-0 w-56 h-56 opacity-70" viewBox="0 0 140 140">
                <polygon points="140,140 20,140 140,20" fill="url(#blueGrad4)" />
                <polygon points="140,140 60,140 140,60" fill="url(#blueGrad5)" />
                <polygon points="140,140 95,140 140,95" fill="url(#blueGrad6)" />
                <defs>
                    <linearGradient id="blueGrad4" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="0%" stop-color="#1e40af" stop-opacity="0.15" />
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
                    </linearGradient>
                    <linearGradient id="blueGrad5" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="0%" stop-color="#1e40af" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.08" />
                    </linearGradient>
                    <linearGradient id="blueGrad6" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="0%" stop-color="#1e40af" stop-opacity="0.4" />
                        <stop offset="100%" stop-color="#2563eb" stop-opacity="0.15" />
                    </linearGradient>
                </defs>
            </svg>
        </div>

        <!-- Subtle circuit/tech pattern background -->
        <div class="absolute inset-0 pointer-events-none opacity-[0.03]"
            style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231e40af\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
        </div>

        <!-- CERTIFICATE CONTENT -->
        <div class="relative z-10 flex flex-col items-center justify-between h-full px-24 py-16">

            <!-- Top section: Title -->
            <div class="flex flex-col items-center justify-center w-full mb-4 mt-2">
                <div class="text-center w-full">
                    <h1 class="text-6xl font-black tracking-[0.2em] text-gray-800 leading-tight" style="font-family: 'Georgia', serif;">
                        CERTIFICATE
                    </h1>
                    <p class="text-2xl font-semibold tracking-[0.35em] text-gray-600 mt-2" style="font-family: 'Georgia', serif;">
                        OF PARTICIPATION
                    </p>
                </div>
            </div>

            <!-- Subtitle -->
            <p class="text-2xl text-gray-500 mt-6" style="font-family: 'Georgia', serif;">
                This certificate is proudly presented to :
            </p>

            <!-- Recipient Name -->
            <div class="mt-6 w-full max-w-2xl text-center">
                <div class="border-b-4 border-yellow-500/60 pb-2">
                    <p class="text-6xl font-bold text-gray-800 leading-tight" style="font-family: 'Georgia', serif;">
                        {{ $certificate->recipient_name }}
                    </p>
                </div>
            </div>

            <!-- Webinar Details -->
            <div class="mt-6 text-center space-y-1">
                <p class="text-xl text-gray-500" style="font-family: 'Georgia', serif;">
                    for actively participating in the
                </p>
                <h2 class="text-3xl font-bold text-gray-800 tracking-wide uppercase">
                    {{ $certificate->webinar_title }}
                </h2>
                <p class="text-xl text-gray-600" style="font-family: 'Georgia', serif;">
                    held on {{ $certificate->webinar_date->format('F j, Y') }}.
                </p>
            </div>

            <!-- Appreciation text -->
            <p class="mt-4 text-xl text-gray-500 text-center max-w-3xl leading-relaxed" style="font-family: 'Georgia', serif;">
                We extend our sincere appreciation for your participation, enthusiasm,
                and meaningful engagement throughout the event.
            </p>

            <!-- Signatures + QR Code row -->
            <div class="mt-auto w-full flex items-end justify-between gap-8 pb-8">
                <!-- Speaker signature -->
                <div class="flex-1 text-center relative flex flex-col items-center justify-end h-24">
                    @if ($certificate->speaker_signature_path)
                        <img 
                            src="{{ asset('storage/' . $certificate->speaker_signature_path) }}" 
                            alt="Speaker Signature" 
                            class="w-auto h-24 object-contain absolute bottom-[90%] -mb-4 mix-blend-multiply"
                        />
                    @endif
                    <div class="border-t-2 border-gray-300 pt-4 mx-12 w-full mt-auto relative z-10">
                        <p class="text-2xl font-bold text-gray-800" style="font-family: 'Georgia', serif;">
                            {{ $certificate->speaker_name }}
                        </p>
                        <p class="text-lg font-medium text-yellow-600 italic">
                            {{ $certificate->speaker_role }}
                        </p>
                    </div>
                </div>

                <!-- QR Code -->
                <div class="flex flex-col items-center gap-2 flex-shrink-0">
                    <div class="p-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <!-- Inline base64 QR Code -->
                        <img src="{!! $qrCode !!}" alt="QR Code" class="w-24 h-24">
                    </div>
                    <span class="text-xs text-gray-400 font-medium tracking-wider uppercase">
                        Scan to verify
                    </span>
                </div>

                <!-- Coordinator signature -->
                <div class="flex-1 text-center relative flex flex-col items-center justify-end h-24">
                    @if ($certificate->coordinator_signature_path)
                        <img 
                            src="{{ asset('storage/' . $certificate->coordinator_signature_path) }}" 
                            alt="Coordinator Signature" 
                            class="w-auto h-24 object-contain absolute bottom-[90%] -mb-4 mix-blend-multiply"
                        />
                    @endif
                    <div class="border-t-2 border-gray-300 pt-4 mx-12 w-full mt-auto relative z-10">
                        <p class="text-2xl font-bold text-gray-800" style="font-family: 'Georgia', serif;">
                            {{ $certificate->coordinator_name }}
                        </p>
                        <p class="text-lg font-medium text-yellow-600 italic">
                            {{ $certificate->coordinator_role }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Verified watermark -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                <span class="text-sm text-emerald-700 font-bold tracking-wider uppercase">
                    Verified by AsuraTECH
                </span>
            </div>
        </div>
    </div>
</body>
</html>
