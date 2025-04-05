import { Button, Form, Input, Modal } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { FaApple, FaFacebook, FaGoogle, FaPencilAlt } from 'react-icons/fa';
import AuthorAPI from '../../../apis/Author';
import showMessage from '../../../Helpers/showMessage';
import { getUserCurrent, login } from '../../../slices/auth';

// Constants
const SOCIAL_PROVIDERS = [
  { id: 'google', icon: FaGoogle, color: '#4285F4', label: 'Google' },
  { id: 'facebook', icon: FaFacebook, color: '#1877F2', label: 'Facebook' },
  { id: 'apple', icon: FaApple, color: '#000000', label: 'Apple' }
];

const EMAIL_RULES = [
  { required: true, message: 'Email không được bỏ trống!' },
  { type: 'email', message: 'Email không hợp lệ!' }
];

const PASSWORD_RULES = [
  { required: true, message: 'Mật khẩu không được bỏ trống!' }
];

const ModalLogin = ({ isOpen, setOpenModal,dispatch,navigate }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    loading: false,
    title: false,
    isExists: false,
    showLogin: false
  });

  // Destructure state for cleaner code
  const { loading, title, isExists, showLogin } = state;

  // Memoized title text
  const titleText = useMemo(() => {
    if (!title) return "Đăng nhập / Tạo tài khoản";
    if (title && isExists) return "Bạn đã có tài khoản trên BlogAPP";
    return "Bạn chưa có tài khoản trên BlogAPP,\nVui lòng tạo mật khẩu để truy cập";
  }, [title, isExists]);

  const resetState = useCallback(() => {
    setState(prev => ({
      ...prev,
      showLogin: false,
      title: false,
      isExists: false
    }));
    form.resetFields(['email']);
  }, [form]);

  const handleCloseModal = useCallback(() => {
    resetState();
    setOpenModal(false);
  }, [resetState, setOpenModal]);

  const handleAuthSuccess = useCallback(async (response) => {
    try {
        showMessage(response?.message, 'success');
        dispatch(login(response.data));
        await dispatch(getUserCurrent()).unwrap();
        setOpenModal(false)
        // window.location.reload()
        // navigate(GeneralPaths.HOMEPAGE);
    } catch (error) {
        showMessage(error.message || 'Có lỗi xảy ra', 'error');
    }
    
  }, [dispatch, navigate]);

  const handleEmailCheck = useCallback(async (email) => {
    const response = await AuthorAPI.checkEmailExists(email);
    if (response?.status === HttpStatusCode.Ok) {
      setState(prev => ({
        ...prev,
        showLogin: true,
        title: true,
        isExists: !!response?.data?._id
      }));
      
      if (response?.data?._id) {
        form.setFieldValue('email', response.data.email);
      }
    }
  }, [form]);

  const handleAuthentication = useCallback(async (values) => {
    const authMethod = isExists ? AuthorAPI.loginForm : AuthorAPI.registerForm;
    const response = await authMethod(values);
    
    if (response?.status === HttpStatusCode.Ok) {
      await handleAuthSuccess(response);
    }
  }, [isExists, handleAuthSuccess]);

  const handleCheckMailVal = async (values) => {
    if (!values) return;

    setState(prev => ({ ...prev, loading: true }));
    try {
      if (showLogin) {
        await handleAuthentication(values);
      } else {
        await handleEmailCheck(values.email);
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage(error.message || 'Có lỗi xảy ra', 'error');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSocialLogin = useCallback((provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  }, []);

  // Memoized form component
  const renderForm = useMemo(() => (
    <Form
      form={form}
      name="form-check-mail"
      onFinish={handleCheckMailVal}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Email"
        className="text-gray-700 mb-3"
        name="email"
        rules={EMAIL_RULES}
      >
        <Input
          type="email"
          readOnly={showLogin}
          placeholder="Nhập Email của bạn"
          className="w-full px-4 py-2 rounded"
          suffix={
            showLogin && (
              <span
                onClick={resetState}
                className="flex items-center text-gray-500 cursor-pointer"
              >
                Sửa <FaPencilAlt className="ml-1" />
              </span>
            )
          }
        />
      </Form.Item>

      {showLogin && (
        <Form.Item
          label="Mật khẩu"
          className="text-gray-700 mb-3"
          name="password"
          rules={PASSWORD_RULES}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            className="w-full px-4 py-2 rounded"
          />
        </Form.Item>
      )}

      <Button
        htmlType="submit"
        type="primary"
        loading={loading}
        className="w-full text-white py-3 rounded font-medium transition duration-200"
      >
        Tiếp tục
      </Button>
    </Form>
  ), [form, showLogin, loading, resetState]);

  // Memoized social buttons
  const renderSocialButtons = useMemo(() => (
    <div className="grid grid-cols-3 gap-4">
      {SOCIAL_PROVIDERS.map(({ id, icon: Icon, color, label }) => (
        <button
          key={id}
          onClick={() => handleSocialLogin(label)}
          className="flex flex-col items-center justify-center py-3 border border-gray-300 rounded hover:bg-gray-50"
        >
          <Icon className={`mb-1`} style={{ color }} size={24} />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  ), [handleSocialLogin]);

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onCancel={handleCloseModal} footer={null}>
      <div className="bg-white rounded-lg w-full p-6">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6">
          {titleText}
        </h2>

        {renderForm}

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Hoặc</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {renderSocialButtons}

        <p className="mt-6 text-xs text-gray-600 text-center">
          Tiếp tục là đồng ý với điều khoản sử dụng và chính sách bảo mật. 
          Tài khoản của bạn được reCAPTCHA bảo vệ.
        </p>
      </div>
    </Modal>
  );
};

export default memo(ModalLogin);