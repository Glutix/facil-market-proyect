import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
			<GoogleOAuthProvider clientId='920034384252-bvg3lb05udd60r3psjp8dl02374qbgiq.apps.googleusercontent.com'>
					<App />
    		</GoogleOAuthProvider>;
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
