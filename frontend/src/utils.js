const formatExperienceDate = (value) => {
  if (!value) return 'Present';
  if (typeof value === 'string' && value.toLowerCase() === 'present') return 'Present';

  const date = new Date(`${String(value)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export default formatExperienceDate;