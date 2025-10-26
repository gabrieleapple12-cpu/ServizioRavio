document.getElementById('mailForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const responseElement = document.getElementById('response');

  responseElement.textContent = "📤 Invio in corso...";

  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      responseElement.textContent = "✅ Email inviata con successo!";
      e.target.reset();
    } else {
      responseElement.textContent = "❌ Errore nell'invio dell'email.";
    }
  } catch (error) {
    console.error(error);
    responseElement.textContent = "⚠️ Impossibile contattare il server.";
  }
});
