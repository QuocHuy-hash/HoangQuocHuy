'use client'
import { createTaskAsync, deleteTaskItemAsync, getStatus, getTaskItemListAsync, getTaskItemtList, resetState, updateTaskAsync } from "@/redux-store/action-reducer/actionSlice";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
import { AppDispatch } from "@/redux-store/store";
import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Link from "next/link";
import { showAlert } from "@/utils/alert/alert";

// import { info } from "@/utils/configAxios/config";
import { logoutAsync } from "@/redux-store/login-reducer/loginSlice";
import { useRouter } from "next/navigation";
import { info } from "@/utils/configAxios/config";
export default function Home() {
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();

  const taskItemList: any = useAppSelector(getTaskItemtList);
  const status: any = useAppSelector(getStatus);

  const [taskItems, setTaskItems] = useState<any[]>([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [statusTask, setStatusTask] = useState<any>();
  const [id, setId] = useState<number>();
  const [isAdd, setIsAdd] = useState(false)
  const [viewDT, setViewDT] = useState(false)
  const [name, setName] = useState<any | null>(null);
  const [modal, setModal] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const user = info;
    if (user != null) {
      setName(user.firstName + " " + user.lastName);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoad(true);
      if (searchTerm) {
        const filteredData = taskItemList.filter((item :any) =>
          item.taskName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTaskItems(filteredData);
      } else {
        await dispatch(getTaskItemListAsync());
      }
      setIsLoad(false);
    };
    fetchData();
  }, [dispatch, searchTerm]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const toggle = () => setModal(!modal);

  const openModal = (item: any) => {
    setDataForm(item)
    if (item.id) {
      setIsAdd(false);
    }
    toggle();
  }

  useEffect(() => {
    if (taskItemList) {
      setTaskItems(taskItemList);
    }
  }, [taskItemList]);


  const setDataForm = (item: any) => {
    if (item) {
      if (isAdd) {
        setId(0);
      } else {
        setTaskName(item.taskName);
        setDescription(item.description)
        setStatusTask(item.status)
        setId(item.id);
      }
    }
  }

  const handleDelete = async (id: any) => {
    await dispatch(deleteTaskItemAsync(id));
    showAlert('success', 'delete success!')
    await dispatch(getTaskItemListAsync());


  }
  const handleAddTask = async () => {
    const data = {
      id: id,
      taskName: taskName,
      description: description,
      status: statusTask,
    }
    if (isAdd) {
      await dispatch(createTaskAsync(data));
    } else {
      await dispatch(updateTaskAsync(data));
    }
    if (status === 'idle') {
      await dispatch(getTaskItemListAsync());
      toggle();
    }
  }

  const handleLogout = async() => {
    const res = await dispatch(logoutAsync());
    if (res.meta.requestStatus == "fulfilled") {
      await dispatch(resetState());
      router.push('page/login');
    }
  
  }
  return (
    <>

      <div className="content" >

        <div className="row justify-content-center" >
          <div className="col-md-8">
            <div className="card">
              <div >
                <h1>Todo List</h1>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Tasks"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <p></p>
                <button className="btn btn-success btn-sm me-2" onClick={() => { openModal(""), setIsAdd(true); setViewDT(false) }}>
                  <i className="fas fa-pencil-alt"></i> Add Task
                </button>
              </div>
              <div className="card-body p-0">
                <table className="table">
                  <thead>
                    <tr>
                      <th>taskName</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoad && taskItems.length > 0 ? taskItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.taskName}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td className="project-actions">
                          <div className="d-flex justify-content-around">
                            <button className="btn btn-success btn-sm me-2" onClick={() => { openModal(item); setIsAdd(false); setViewDT(false) }}>
                              <i className="fas fa-pencil-alt"></i> Edit
                            </button>
                            <button className="btn btn-danger btn-sm me-2" onClick={() => {
                              handleDelete(item.id)
                            }}>
                              <i className="fas fa-trash"></i> Delete
                            </button>
                            <button className="btn btn-info btn-sm me-2" onClick={() => { openModal(item); setIsAdd(false); setViewDT(true)}}>
                              <i className="fas fa-search"></i> View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={4}>Loadding</td></tr> }
                  </tbody>
                </table>
              </div>

            </div>
            { name ?
              <>
                <h1>{name}</h1>
                <button className="btn btn-info btn-sm me-2" onClick={handleLogout}>
                  Logout
                </button>
              </> :
              <Link href={`page/login`}>Login</Link>
            }

          </div>
        </div>
        <Modal isOpen={modal} toggle={openModal} >
          <ModalHeader toggle={openModal}>{"Task - Details"}</ModalHeader>
          <ModalBody>
            <form className="form-horizontal">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">TaskName: </label>
                <div className="col-sm-8">
                  <input className="form-control" id="title"
                    value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Decription: </label>
                <div className="col-sm-8">
                  <input className="form-control" id="details"
                    value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>

              {isAdd === false ?
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status: </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      id="dvt"
                      value={statusTask}
                      onChange={(e) => setStatusTask(e.target.value)}
                    >

                      <option value="doing" key={id}>doing</option>
                      <option value="finished" key={id}>finished</option>

                    </select>
                  </div>
                </div>
                : ""}


              {isAdd === false ? <div className="form-group row">
                <label className="col-sm-4 col-form-label">Member: </label>
                <div className="col-sm-8">
                  <p className="form-control">{name}</p>

                </div>
              </div> : ""}

            </form>
          </ModalBody>
          <ModalFooter>
            {!viewDT ? <><Button color="secondary" onClick={() => { handleAddTask() }} style={{ backgroundColor: "green" }} >
              {isAdd ? "Add Submit" : "Edit Submit"}
            </Button>
            </> :""}
            
            <Button color="secondary" onClick={() => {
              openModal("")
            }
            } style={{ backgroundColor: "red" }} >
              close
            </Button>

          </ModalFooter>
        </Modal >
      </div >

    </>
  );
}
