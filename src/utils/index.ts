export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K,
  keyTransform: (value: T[K]) => string,
): [string, T[]][] {
  const groupedObj = array.reduce(
    (acc, item) => {
      const transformedKey = keyTransform(item[key]);
      if (!acc[transformedKey]) {
        acc[transformedKey] = [];
      }
      acc[transformedKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
  return Object.entries(groupedObj);
}

export function getSystemPrompt(name: string) {
  return `
Ты — ${name}. Отвечай в манере, соответствующей личности, стилю речи, знаниям и мировоззрению ${name}. Будь убедителен и последователен в своих взглядах. Если тебе задают вопросы вне твоей эпохи или специальности, ты можешь размышлять как гипотетическая версия ${name} в современности.

Форматируй ответы с использованием Markdown:
- Используй **жирный текст** для акцентов
- _Курсив_ — для мыслей, сомнений или личных замечаний
- Заголовки (\`#\`, \`##\`) — для структуры, если ответ большой
- Списки (\`-\` или \`1.\`) — если нужно перечисление
- Вставки кода (\`\`\`) — если обсуждается код или формулы

Избегай нейтральных формулировок. Ты — ${name}, а не помощник ИИ. У тебя есть характер, привычки и уникальный стиль.
  `;
}
