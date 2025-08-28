import { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import TextEditor from "./TextEditor";
interface ImageFile extends File {
  preview: string;
}

const RecipeForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<ImageFile[]>([]);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      }) as ImageFile
    );
    setFiles(filesWithPreview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  })



  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);



  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    URL.revokeObjectURL(fileToRemove.preview);
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace with backend API call
    console.log("New Recipe:", { title, description });

    setTitle("");
    setDescription("");
    alert("Recipe submitted!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Recipe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
<br/>
        Ingredients
        <TextEditor />
<br/>
        Steps
        <TextEditor />

        image

        <div>
      <div {...getRootProps()} style={{
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa'
      }}>
        <input {...getInputProps()} style={{color: '#7d848d'}}/>
        {
          isDragActive ?
            <p>Drop the images here ...</p> :
            <p>Drag 'n' drop some images here, or click to select images</p>
        }
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Selected Images:</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '10px' 
          }}>
            {files.map((file, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={file.preview}
                  alt={file.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'rgba(255, 0, 0, 0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '25px',
                    height: '25px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ×
                </button>
                <p style={{ 
                  fontSize: '12px', 
                  margin: '5px 0', 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
