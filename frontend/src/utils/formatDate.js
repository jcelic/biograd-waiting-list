export const formatDateTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  return (
    date.toLocaleDateString('hr-HR').replaceAll(' ', '') +
    ' ' +
    date.toLocaleTimeString('hr-HR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('hr-HR');
};
