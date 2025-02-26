
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form } from "antd";

const CkEditorComponent = ({content,name,setData,data}) => {
  return(
    <Form.Item
      name="content"
      label="Nội dung"
      className='mt-2'
      rules={[
        { required: true,message: 'Nội dung không được bỏ trống'}]}
    >
      <CKEditor
          editor={ClassicEditor}
          name={name}
          data={content}
          onChange={(event, editor) => {
              const data = editor.getData();
              setData((prev) => ({...prev,content : data}));
          }}
          
      />
    </Form.Item>
       

  )
}

export default CkEditorComponent 