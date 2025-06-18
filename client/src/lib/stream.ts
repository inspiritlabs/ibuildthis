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
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    onToken(decoder.decode(value));
  }
};
