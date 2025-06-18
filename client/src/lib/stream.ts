export const stream = async (
  url: string,
  body: Record<string, unknown>,
  onToken: (token: string) => void
) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let index;
    while ((index = buffer.indexOf('\n\n')) !== -1) {
      const chunk = buffer.slice(0, index).trim();
      buffer = buffer.slice(index + 2);
      if (chunk.startsWith('data:')) {
        const data = chunk.replace(/^data:\s*/, '');
        if (data === '[DONE]') return;
        onToken(data);
      }
    }
  }
};
