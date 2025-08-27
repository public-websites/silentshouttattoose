// Alternativ script.js för PHP backend
// Ersätt sendEmail funktionen med denna om du använder PHP:

async function sendEmail(data, formType) {
    try {
        const response = await fetch('send-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            alert(`Tack för din ${formType === 'tattoo' ? 'tatueringsförfrågan' : 'konstförfrågan'}! Vi kontaktar dig så snart vi kan.`);
            return true;
        } else {
            throw new Error(result.error || 'Okänt fel');
        }
        
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Något gick fel när meddelandet skulle skickas. Försök igen eller kontakta oss direkt.');
        return false;
    }
}
