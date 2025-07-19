import React from 'react'
import { useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

export default function PasswordInput({ password, setPassword }){
    const [visible, setVisible] = useState(false)

    return (
        <div>
            <label htmlFor='password'>
                password:{' '}
            </label>
            <input
                data-testid='password'
                type={visible ? 'text' : 'password'}
                value={password}
                placeholder='password'
                id='password'
                onChange={({ target }) => setPassword(target.value)}/>
            <span onClick={() => setVisible(!visible)}>{visible ?  <EyeInvisibleOutlined/> : <EyeOutlined/> }</span>
        </div>
    )
}