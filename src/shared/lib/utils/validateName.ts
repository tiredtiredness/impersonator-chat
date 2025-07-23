export function validateName(name: string): string {
  if (!name.trim()) return 'Имя не может быть пустым';
  if (name.length < 3) return 'Имя должно содержать минимум 3 символа';
  if (name.length > 30) return 'Имя не может быть длиннее 30 символов';
  if (!/^[a-zA-Zа-яА-ЯёЁ0-9\s\-]+$/.test(name)) return 'Имя содержит недопустимые символы';
  return '';
}
