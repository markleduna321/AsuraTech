<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>We received your request — AsuraTECH Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

                    <tr>
                        <td bgcolor="#4f46e5" style="background:#4f46e5;padding:40px;text-align:center;">
                            <div style="display:inline-block;background:rgba(255,255,255,0.2);border-radius:12px;padding:10px 18px;margin-bottom:20px;">
                                <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">&#9889; Asura<span style="color:#c7d2fe;">TECH</span></span>
                            </div>
                            <div style="width:64px;height:64px;margin:0 auto 16px;background:rgba(255,255,255,0.15);border-radius:50%;font-size:32px;line-height:64px;text-align:center;">
                                <span style="font-size:32px;">&#10003;</span>
                            </div>
                            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Request Received!</h1>
                            <p style="margin:10px 0 0;color:#c7d2fe;font-size:15px;">We'll get back to you within 24 hours.</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:36px 40px 0;">
                            <p style="margin:0 0 8px;font-size:16px;color:#1e293b;">Hi <strong>{{ $lead->name }}</strong>,</p>
                            <p style="margin:0;font-size:15px;color:#475569;line-height:1.7;">
                                Thank you for reaching out to <strong>AsuraTECH Solutions</strong>! We've received your inquiry and our team is already reviewing it. You can expect to hear from us within <strong>24 hours</strong> on business days.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:28px 40px 0;">
                            <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#1e293b;">&#128203; Your Request Summary</h2>
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
                                <tr style="background:#f8fafc;">
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;width:35%;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
                                    <td style="padding:12px 16px;font-size:14px;color:#1e293b;font-weight:600;border-bottom:1px solid #e2e8f0;">{{ $lead->name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
                                    <td style="padding:12px 16px;font-size:14px;color:#475569;border-bottom:1px solid #e2e8f0;">{{ $lead->email }}</td>
                                </tr>
                                @if($lead->company)
                                <tr style="background:#f8fafc;">
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.5px;">Company</td>
                                    <td style="padding:12px 16px;font-size:14px;color:#1e293b;border-bottom:1px solid #e2e8f0;">{{ $lead->company }}</td>
                                </tr>
                                @endif
                                <tr style="{{ !$lead->company ? 'background:#f8fafc;' : '' }}">
                                    <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Service Interest</td>
                                    <td style="padding:12px 16px;font-size:14px;color:#4f46e5;font-weight:700;">{{ ucfirst($lead->service_interest) }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    @if($lead->requirements)
                    <tr>
                        <td style="padding:24px 40px 0;">
                            <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#1e293b;">&#128221; What You Told Us</h2>
                            <div style="background:#faf5ff;border-left:4px solid #7c3aed;border-radius:0 8px 8px 0;padding:16px 20px;">
                                <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">{{ $lead->requirements }}</p>
                            </div>
                        </td>
                    </tr>
                    @endif

                    <tr>
                        <td style="padding:28px 40px 0;">
                            <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#1e293b;">&#128680; What Happens Next?</h2>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 0 14px;vertical-align:top;width:36px;">
                                        <div style="width:28px;height:28px;background:#4f46e5;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-size:12px;font-weight:700;">1</div>
                                    </td>
                                    <td style="padding:0 0 14px 12px;vertical-align:top;">
                                        <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Our team reviews your request</p>
                                        <p style="margin:4px 0 0;font-size:13px;color:#64748b;">We assess your requirements and identify the best solution.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 0 14px;vertical-align:top;">
                                        <div style="width:28px;height:28px;background:#4f46e5;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-size:12px;font-weight:700;">2</div>
                                    </td>
                                    <td style="padding:0 0 14px 12px;vertical-align:top;">
                                        <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">We prepare a tailored proposal</p>
                                        <p style="margin:4px 0 0;font-size:13px;color:#64748b;">A custom quote or demo schedule is prepared based on your needs.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="vertical-align:top;">
                                        <div style="width:28px;height:28px;background:#4f46e5;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-size:12px;font-weight:700;">3</div>
                                    </td>
                                    <td style="padding:0 0 0 12px;vertical-align:top;">
                                        <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">We reach out within 24 hours</p>
                                        <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Expect an email or call from our team at <strong>{{ $lead->email }}</strong>.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:28px 40px;">
                            <div style="background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;padding:20px 24px;text-align:center;">
                                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1e293b;">Need to reach us sooner?</p>
                                <p style="margin:0;font-size:13px;color:#64748b;">
                                    &#9993;&nbsp;<a href="mailto:hello@asuratechsolutions.com" style="color:#4f46e5;text-decoration:none;font-weight:600;">hello@asuratechsolutions.com</a>
                                    &nbsp;&nbsp;&#128222;&nbsp;<a href="tel:+639959822419" style="color:#4f46e5;text-decoration:none;font-weight:600;">+63 995 982 2419</a>
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
                            <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                                You are receiving this email because you submitted an inquiry via the AsuraTECH Solutions website.<br />
                                &copy; {{ date('Y') }} AsuraTECH Solutions &mdash; Philippines &mdash;
                                <a href="https://asuratechsolutions.com" style="color:#94a3b8;text-decoration:none;">asuratechsolutions.com</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
