---
to: <%= path %>/<%= name %>.tsx
---
import style from './<%= name %>.module.css';

<% if (have_props) { -%>
interface Props {};
<% } -%>

export const <%= name%> = <%= props %> => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};