# react-portal-hook

A flexible react portal library made with hooks

## Getting Started

### Installation

To use react-portal-hook in your project, run:

```shell script
npm install react-portal-hook
```

### Setup

Wrap your root component with `PortalProvider`.

```js
// app.jsx

import { PortalProvider } from "react-portal-hook";

const App = () => {
  return (
    <PortalProvider>
      <RootComponent />
    </PortalProvider>
  );
};
```

### Usage

**Example** - Modals:

By default, portals will be rendered in `document.body`.

[Demo](https://codesandbox.io/s/react-portal-hook-modal-example-iow95)

```js
// page.jsx

import { usePortals } from "react-portal-hook";

const Modal = ({ closeModal }) => {
  return (
    <div>
      <h2>Title</h2>
      <p>This is a modal</p>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  );
};

export const Page = () => {
  const portalManager = usePortals();

  const openModal = () => {
    portalManager.open(portal => <Modal closeModal={portal.close} />);
  };

  return (
    <div>
      <h2>Title</h2>
      <p>This is a page</p>
      <button onClick={openModal}>Open Modal</button>
    </div>
  );
};
```

**Example** - Notifications:

You can specify a DOM node in which to render the portals via the `appendTo` option of the `open` method:

[Demo](https://codesandbox.io/s/react-portal-hook-notifications-example-os1b4)

```js
// layout.jsx

import { usePortals } from "react-portal-hook";

const Notification = ({ closeNotification }) => {
  return (
    <div>
      <p>
        This is a notification{" "}
        <button onClick={closeNotification}>Close Notification</button>
      </p>
    </div>
  );
};

export const Layout = () => {
  const portalManager = usePortals();

  const showNotification = () => {
    portalManager.open(
      portal => <Notification closeNotification={portal.close} />,
      {
        appendTo: document.getElementById("notification-holder")
      }
    );
  };

  return (
    <div>
      <div id="notification-holder" />
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};
```
