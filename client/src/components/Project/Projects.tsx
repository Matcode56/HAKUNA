import { useState } from "react";
import { CreateProjects } from "./CreateProjects";
import { ListOfProjects } from "./ListOfProjects";
import { SingleProject } from "./SingleProject";
import { UpdateProject } from "./UpdateProject";
import Select from 'react-select'


export const Projects = () => {
  
  const options = [
    { value: 'date', label: 'Date' },
    { value: 'name', label: 'Name' },
    { value: 'status', label: 'Status' }
  ]
  return (
    <>
    <h1 className="text-center text-3xl underline pt-4 ">Projects List</h1>
    <div className="flex justify-center ml-8">
      <div className="container bg-white  py-20 mt-20 rounded-3xl shadow-xl w-4/5 px-12 grid">
      <div className="flex justify-end -mt-10 mb-6">
      <div className="flex justify-end">
      <Select options={options} placeholder="Sort By" />
</div>
      <button className="bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md">Filters </button>
      </div>
        <ListOfProjects />
        <SingleProject />
        <CreateProjects />
        <UpdateProject />
        <button
          className="custom-buttons justify-self-end"
          type="button"
          onClick={() => {
            document
              .querySelector(".modal-create-project")
              ?.classList.add("is-active");
          }}
        >
          New Project
        </button>
      </div>
    </div>
    </>
  );
};
