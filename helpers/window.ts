export const setWindowLocation = (value: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = value;
  }
};
