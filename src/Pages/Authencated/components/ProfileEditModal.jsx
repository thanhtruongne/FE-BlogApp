import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import UploadAvatar from './UploadAvatar';

const ProfileEditModal = ({ 
    isVisible, 
    modalType, 
    user, 
    onCancel, 
    onSave,
    loading
}) => {
    const [form] = Form.useForm();
    const [dataAvatar, setDataAvatar] = useState(null);
    const [isDirty, setIsDirty] = useState(false);
   
    useEffect(() => {
        if (dataAvatar) {
            setIsDirty(true);
        }
    }, [dataAvatar]);

    // Reset form state when modal opens/changes
    useEffect(() => {
        if (isVisible) {
            setIsDirty(false);
            form.resetFields();
        }
    }, [isVisible, modalType, form]);

    const handleFormValuesChange = () => {
        setIsDirty(true);
    };

    const handleOk = async () => {
        try {
            if (!isDirty) {
                onCancel();
                return;
            }
            
            const values = await form.validateFields();
            if (modalType === 'avatar' && dataAvatar) {
                values.avatar = dataAvatar;
            }
            console.log(values, 'after avatar');
            onSave(modalType, values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        setDataAvatar(null);
        setIsDirty(false);
        form.resetFields();
        onCancel();
    };

    // Get modal title based on type
    const getModalTitle = () => {
        const titles = {
            avatar: 'Ảnh đại diện',
            name: 'Họ tên',
            email: 'Email',
            password: 'Mật khẩu'
        };
        return titles[modalType] || '';
    };

    const renderModalContent = () => {
        switch (modalType) {
            case 'avatar':
                return (
                    <Form form={form} layout="vertical">
                        <div className="text-center mb-4">
                            <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.imageURL} alt="Current avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-violet-500 text-white flex items-center justify-center text-lg font-medium">
                                        {user.full_name?.charAt(0) || 'N'}
                                    </div>
                                )}
                            </div>
                            <UploadAvatar
                                data={user}
                                setData={setDataAvatar}
                                name='avatar'
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button onClick={handleCancel}>Hủy</Button>
                            <Button 
                                loading={loading} 
                                type="primary" 
                                onClick={handleOk}
                                disabled={!isDirty}
                            >
                                Lưu thay đổi
                            </Button>
                        </div>
                    </Form>
                );
            case 'name':
                return (
                    <Form 
                        form={form} 
                        layout="vertical"
                        onValuesChange={handleFormValuesChange}
                        initialValues={{ full_name: user.full_name }}
                    >
                        <Form.Item
                            name="full_name"
                            label="Nhập họ tên"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input placeholder="Nhập họ tên" />
                        </Form.Item>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button onClick={handleCancel}>Hủy</Button>
                            <Button 
                                loading={loading} 
                                type="primary" 
                                onClick={handleOk}
                                disabled={!isDirty}
                            >
                                Đổi tên
                            </Button>
                        </div>
                    </Form>
                );
            case 'email':
                return (
                    <Form 
                        form={form} 
                        layout="vertical"
                        onValuesChange={handleFormValuesChange}
                    >
                        <Form.Item
                            name="passwordChangeMail"
                            label="Nhập mật khẩu hiện tại"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                        </Form.Item>
                        <Form.Item
                            name="newEmail"
                            label="Nhập email mới"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email mới!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                            initialValue={user.email}
                        >
                            <Input placeholder="Nhập email mới" />
                        </Form.Item>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button onClick={handleCancel}>Hủy</Button>
                            <Button 
                                loading={loading} 
                                type="primary" 
                                onClick={handleOk}
                                disabled={!isDirty}
                            >
                                Đổi email
                            </Button>
                        </div>
                    </Form>
                );
            case 'password':
                return (
                    <Form 
                        form={form} 
                        layout="vertical"
                        onValuesChange={handleFormValuesChange}
                    >
                        <Form.Item
                            name="currentPassword"
                            label="Nhập mật khẩu hiện tại"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="Nhập mật khẩu mới"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                        >
                            <Input.Password placeholder="Tạo mật khẩu mới" />
                        </Form.Item>
                        <div className="flex justify-between mt-4">
                            <Button onClick={handleCancel}>Hủy</Button>
                            <div className="flex gap-2">
                                <Button 
                                    loading={loading} 
                                    type="primary" 
                                    onClick={handleOk}
                                    disabled={!isDirty}
                                >
                                    Đổi mật khẩu
                                </Button>
                            </div>
                        </div>
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            title={getModalTitle()}
            open={isVisible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}
        >
            {renderModalContent()}
        </Modal>
    );
};

export default ProfileEditModal; 