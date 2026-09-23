<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your AsuraTECH Certificate</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f1f5f9; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; }
        h1 { color: #fff; margin-top: 0; }
        p { line-height: 1.6; color: #cbd5e1; }
        .btn { display: inline-block; background-color: #3b82f6; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
        .qr-container { margin: 30px 0; padding: 20px; background: #ffffff; display: inline-block; border-radius: 12px; }
        .footer { margin-top: 30px; font-size: 12px; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Congratulations, {{ $certificate->recipient_name }}!</h1>
        <p>You have successfully completed <strong>{{ $certificate->webinar_title }}</strong>.</p>
        <p>Your official certificate is attached to this email as a high-quality image (PNG).</p>
        
        <div class="qr-container">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={{ urlencode(url("/certificates/{$certificate->uuid}")) }}" alt="Scan to Verify" width="150" height="150">
        </div>

        <p>Scan the QR code above or click the button below to view and verify your certificate online.</p>

        <a href="{{ url("/certificates/{$certificate->uuid}") }}" class="btn">View Live Certificate</a>

        <div class="footer">
            &copy; {{ date('Y') }} AsuraTECH. All rights reserved.
        </div>
    </div>
</body>
</html>
