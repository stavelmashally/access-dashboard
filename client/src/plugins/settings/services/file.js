export const downloadJsonFile = ({ content, fileName = 'config' }) => {
  const parsedContent = JSON.stringify(content, null, 2);

  const blob = new Blob([parsedContent], { type: 'application/json' });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.json`;

  document.body.appendChild(link);

  link.click();

  link.parentNode.removeChild(link);
};
