const TIMEOUT_LEN = 1000;
const SERVER_HOST = 'localhost:4322';

class Unreachable extends Error {
  constructor(v: never) {
    super(v);
  }
}

type Status =
  | 'init'
  | 'ok'
  | 'not good';

async function checkStatus(): Promise<Status> {
  console.info('checking host');
  const response = await fetch(`http://${SERVER_HOST}/`);
  if (!response.ok) return 'not good';
  const payload = await response.json();
  console.info(payload);
  return 'ok';
}

function setStatusMessage(message: string) {
  const status = document.getElementById('status');
  const statusText = status?.childNodes[0];

  if (statusText instanceof Text) {
    statusText.data = message;
  } else if (status != null) {
    status.appendChild(document.createTextNode(message));
  }
}

function setStatus(status: Status) {
  switch (status) {
    case 'ok':
      setStatusMessage("Server Ok");
      break;
    case 'not good':
      setStatusMessage("Server Not good");
      break;
    case 'init':
      setStatusMessage("Server status pending");
      break;
    default:
      throw new Unreachable(status);
  }
}

async function loop() {
  try {
    setStatus(await checkStatus());
  } catch (error) {
    console.error(error);
    setStatus('not good');
  } finally {
    setTimeout(loop, TIMEOUT_LEN);
  }
}

console.info('starting');
setStatus('init');
setTimeout(loop, TIMEOUT_LEN);
