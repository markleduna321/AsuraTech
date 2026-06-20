<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Lead — AsuraTECH Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

                    <tr>
                        <td bgcolor="#4f46e5" style="background:#4f46e5;padding:36px 40px;text-align:center;">
                            <div style="display:inline-block;background:rgba(255,255,255,0.2);border-radius:12px;padding:10px 18px;margin-bottom:16px;">
                                <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">&#9889; Asura<span style="color:#c7d2fe;">TECH</span></span>
                            </div>
                            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">&#127919; New Lead Received</h1>
                            <p style="margin:8px 0 0;color:#c7d2fe;font-size:14px;">{{ now()->setTimezone('Asia/Manila')->format('F j, Y') }} PHT</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:28px 40px 0;text-align:center;">
                            <span style="display:inline-block;background:#ede9fe;color:#5b21b6;font-size:12px;font-weight:700;padding:6px 20px;border-radius:999px;text-transform:uppercase;letter-spacing:0.8px;">
                                Service: {{ ucfirst($lead->service_interest) }}
                            </span>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:24px 40px 0;">
                            <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#1e293b;">&#128100; Contact Information</h2>
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
                                <tr style="background:#f8fafc;">
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;width:30%;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
                                    <td style="padding:12px 16px;font-size:14px;color:#1e293b;font-weight:600;border-bottom:1px solid #e2e8f0;">{{ $lead->name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
                                    <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #e2e8f0;">
                                        <a href="mailto:{{ $lead->email }}" style="color:#4f46e5;text-decoration:none;font-weight:600;">{{ $lead->email }}</a>
                                    </td>
                                </tr>
                                @if($lead->phone)
                                <tr style="background:#f8fafc;">
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.5px;">Phone</td>
                                    <td style="padding:12px 16px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0;">
                                        <a href="tel:{{ $lead->phone }}" style="color:#4f46e5;text-decoration:none;">{{ $lead->phone }}</a>
                                    </td>
                                </tr>
                                @endif
                                @if($lead->company)
                                <tr style="background:#f8fafc;">
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Company</td>
                                    <td style="padding:12px 16px;font-size:14px;color:#1e293b;font-weight:500;">{{ $lead->company }}</td>
                                </tr>
                                @endif
                            </table>
                        </td>
                    </tr>

                    @if($lead->requirements)
                    <tr>
                        <td style="padding:24px 40px 0;">
                            <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#1e293b;">&#128203; Requirements Summary</h2>
                            <div style="background:#faf5ff;border-left:4px solid #7c3aed;border-radius:0 8px 8px 0;padding:16px 20px;">
                                <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">{{ $lead->requirements }}</p>
                            </div>
                        </td>
                    </tr>
                    @endif

                    @if($lead->conversation && count($lead->conversation) > 0)
                    <tr>
                        <td style="padding:24px 40px 0;">
                            <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#1e293b;">&#128172; Conversation History</h2>
                            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;">
                                @foreach($lead->conversation as $msg)
                                <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #e2e8f0;">
                                    <p style="margin:0 0 3px;font-size:11px;font-weight:700;text-transform:uppercase;color:{{ $msg['role'] === 'user' ? '#4f46e5' : '#64748b' }};">
                                        {{ $msg['role'] === 'user' ? 'Customer' : 'AI Assistant' }}
                                    </p>
                                    <p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">{{ $msg['content'] }}</p>
                                </div>
                                @endforeach
                            </div>
                        </td>
                    </tr>
                    @endif

                    <tr>
                        <td style="padding:28px 40px;text-align:center;">
                            <a href="mailto:{{ $lead->email }}?subject=Re:%20Your%20{{ urlencode(ucfirst($lead->service_interest)) }}%20inquiry%20%E2%80%94%20AsuraTECH%20Solutions"
                               style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">
                                &#9993;&nbsp; Reply to {{ $lead->name }}
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
                            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                                This notification was generated automatically by the AsuraTECH Solutions website chatbot.<br />
                                &copy; {{ date('Y') }} AsuraTECH Solutions &mdash; Philippines
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
