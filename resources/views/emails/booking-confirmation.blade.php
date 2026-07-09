<x-mail::message>
# Booking Confirmed

Hi **{{ $booking->customer_name }}**,

Your MintyFresh cleaning appointment has been successfully scheduled. Here is a summary of your booking:

---

<x-mail::panel>
**Booking #{{ str_pad($booking->id, 5, '0', STR_PAD_LEFT) }}**

| Detail | Info |
|---|---|
| **Service** | {{ ucwords(str_replace('_', ' ', $booking->service_type)) }} Clean |
| **Property** | {{ $booking->bedrooms }} Bed / {{ $booking->bathrooms }} Bath |
| **Date** | {{ \Carbon\Carbon::parse($booking->booking_date)->format('l, F j, Y') }} |
| **Arrival Time** | {{ $booking->booking_time }} |
| **Address** | {{ $booking->address }}, {{ $booking->city }} {{ $booking->zip_code }} |
| **Cleaner Assigned** | {{ $booking->cleaner?->name ?? 'First Available' }} |
| **Total Charged** | ${{ $booking->total_price }} |

@if($booking->special_instructions)
**Special Instructions:** {{ $booking->special_instructions }}
@endif
</x-mail::panel>

---

If you need to make any changes or have questions about your appointment, please contact us at **hello@mintyfresh.com** and reference your booking number above.

We look forward to making your space spotless!

<x-mail::button :url="config('app.url')" color="success">
Visit MintyFresh
</x-mail::button>

Warm regards,
**The MintyFresh Cleaning Team**

*This is an automated confirmation. Please do not reply to this email.*
</x-mail::message>
