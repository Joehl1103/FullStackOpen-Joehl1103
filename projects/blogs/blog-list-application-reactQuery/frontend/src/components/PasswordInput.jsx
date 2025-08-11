import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Input, Label } from '../styles/styledComponent.jsx'

export default function PasswordInput({ password, setPassword }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Label htmlFor="password">Password: </Label>
      <Input
        data-testid="password"
        type={visible ? "text" : "password"}
        value={password}
        placeholder="password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <span onClick={() => setVisible(!visible)}>
        {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </span>
    </div>
  );
}
