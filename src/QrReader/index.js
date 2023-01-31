/*import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from "html5-qrcode";

import styles from './QrReader.module.css';

const qrConfig = { fps: 10, qrbox: { width: 200, height: 200 } };

let html5QrCode;

const QrReader = () => {

	const [result, setResult] = useState('Click start to scan');

	useEffect(() => {
		html5QrCode = new Html5Qrcode("reader");
	}, []);

	const handleClickAdvanced = () => {
		setResult('');

		const qrCodeSuccessCallback = (decodedText, decodedResult) => {
		  setResult(decodedText);
		  handleStop();
		};
		html5QrCode.start(
		  { facingMode: "environment" },
		  qrConfig,
		  qrCodeSuccessCallback
		);
	};
	
	const handleStop = () => {
		try {
			html5QrCode
			.stop()
			.then((res) => {
				html5QrCode.clear();
			})
			.catch((err) => {
				console.log(err.message);
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.container}>
			<div id="reader" className={styles.camera} />
			<button onClick={() => handleClickAdvanced()}>
				start
			</button>
			<button onClick={() => handleStop()}>stop</button>
			<div className={styles.result}>{result}</div>		
		</div>
	);
}

export default QrReader;*/

import React, { useState, useRef, useEffect } from 'react';
import html5QrCode from 'html5-qrcode';
import styles from './QrReader.module.css';

const ReactQRCode = () => {
  const qrCodeRef = useRef(null);
  const [qrCodeValue, setQrCodeValue] = useState(null);

  useEffect(() => {
    html5QrCode.start(qrCodeRef.current, {
      fps: 10,
      qrbox: 250,
      correctLevel: html5QrCode.CorrectLevel.H
    }, (qrCode) => {
      setQrCodeValue(qrCode);
      const win = window.open(qrCode, '_blank');
      win.focus();
    });

    return () => {
      html5QrCode.stop();
    };
  }, []);

  return (
    <div>
      <div ref={qrCodeRef} />
      {qrCodeValue && <p>Scanned QR code: {qrCodeValue}</p>}
    </div>
  );
};

export default ReactQRCode;
