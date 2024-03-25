import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

function DropFile() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const file = acceptedFiles.map((file) => <p key={Date.now()}>{file.name}</p>);

  return (
    <section className="container w-min">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex flex-col w-96 px-8 py-2 items-center rounded-lg border border-color-[#acacac]"
      >
        <i className="mb-4">
          <FaCloudUploadAlt size={25} />
        </i>
        <input {...getInputProps()} />
        <p className="">
          <mark className="bg-white text-blue-200 underline cursor-pointer">
            Click to upload
          </mark>{" "}
          or drag and drop
        </p>
        <p className="font-light text-sm">PNG, JPG, or SVG </p>
      </div>
      <aside>
        <p className="whitespace-nowrap	italic overflow-hidden w-80 text-ellipsis text-xs ">
          {file}
        </p>
      </aside>
    </section>
  );
}

export default DropFile;
