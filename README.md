# react-portal-hook

A flexible react portal library made with hooks

### Usage

```tsx
import React from "react";
import { render } from "react-dom";
import { PortalProvider, usePortals } from "react-portal-hook";

const Modal = ({ closeModal }) => {
  return (
    <div>
      <h1>Title</h1>
      <p>This is a modal</p>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

const App = () => {
  const portalManager = usePortals();
  const open = () => portalManager.open(portal => <Modal closeModal={portal.close} />);

  return (
    <PortalProvider>
      This is my app
      <button onClick={open}>Open modal</button>
    </PortalProvider>
  );
};

render(<App />, document.getElementById("root"));
```
