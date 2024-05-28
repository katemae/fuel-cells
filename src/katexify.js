import katex from 'katex';
import 'katex/dist/katex.min.css'; // Ensure this import is here

export default function katexify(math, displayMode = false) {
  const options = {
    displayMode: displayMode,
    throwOnError: false,
  };
  return katex.renderToString(math, options);
}