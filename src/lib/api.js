export const sendContactForm = async (data) =>
  fetch("api/v1/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Falha ao enviar e-mail.");
    return res.json();
  });
