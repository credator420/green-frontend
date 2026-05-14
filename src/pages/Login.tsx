import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonList, IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const history = useHistory();

  const handleLogin = async () => {
    // Scrub data immediately
    const username = form.username.trim().toLowerCase();
    const password = form.password.trim();

    if (!username || !password) {
      alert("Hold up! Fill in both fields first.");
      return;
    }

    try {
      const data = await loginUser({ username, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert("Blazing... You're in!");
        history.push('/tabs/tab1');
      } else {
        alert("Invalid login. Double check your stash (credentials).");
      }
    } catch (err) {
      alert("Server is ghosting... check if your backend is running.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Stoner Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput 
              value={form.username} 
              onIonInput={e => setForm({...form, username: e.detail.value!})} 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput 
              type="password" 
              value={form.password} 
              onIonInput={e => setForm({...form, password: e.detail.value!})} 
            />
          </IonItem>
        </IonList>
        <div style={{ marginTop: '20px' }}>
          <IonButton expand="block" color="success" onClick={handleLogin}>Log In</IonButton>
          <IonButton expand="block" fill="clear" onClick={() => history.push('/register')}>
            New here? Join the circle
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;