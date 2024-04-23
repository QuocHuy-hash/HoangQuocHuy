import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { config } from '@/utils/configAxios/config';

const serverUrl = "http://localhost:3000/v1/api";

export interface TaskItemState {
    tasItemList: any[];
    listStatus: any[];
    task: any
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TaskItemState = {
    tasItemList: [],
    listStatus: [],
    task: null,
    status: 'idle',
};

export const getTaskItemListAsync = createAsyncThunk(
    'task/get-list',
    async () => {
        try {
            const response = await axios.get(serverUrl + '/task/getByUser', config);
            if(response.data.message.metadata) {
                return response.data.message.metadata;

            }
            
        } catch (error) {
            console.log("error ", error);
        }

    }
);
// export const getTaskDetailsAsync = createAsyncThunk(
//     'task/get-details',
//     async (id: any) => {
//         try {
//             const response = await axios.get(serverUrl + '/api/task/details', {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 params: { id }
//             });
//             return response.data;
//         } catch (error) {
//             console.log("error ", error);
//         }

//     }
// );

export const createTaskAsync = createAsyncThunk(
    'task/create',
    async (data: any) => {
        const { taskName, description,  } = data;
        try {
            const response = await axios.post(serverUrl + '/task/create', { taskName, description }, config);
            return response.data;
        } catch (error) {
            console.log("error ", error);
        }

    }
);
export const updateTaskAsync = createAsyncThunk(
    'task/update',
    async (data: any) => {
        const { id , taskName, description,status } = data;
        try {
            const response = await axios.post(serverUrl + '/task/update', { id, taskName, description, status }, config);
            return response.data;
        } catch (error) {
            console.log("error ", error);
        }

    }
);
export const resetState = createAction("Reset_all");
export const deleteTaskItemAsync = createAsyncThunk(
    'task/delete',
    async (id: any) => {
        const response = await axios.post(serverUrl + '/task/delete', { id }, config);
        return response.data;
    }
);
const taskItemSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {


    },

    extraReducers: (builder) => {
        builder

            .addCase(getTaskItemListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTaskItemListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasItemList = action.payload;
            }).addCase(getTaskItemListAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.task = action.payload;
            }).addCase(updateTaskAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteTaskItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTaskItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasItemList = action.payload;
            })
            .addCase(deleteTaskItemAsync.rejected, (state) => {
                state.status = 'failed';
            }).addCase(createTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasItemList = action.payload;
            })
            .addCase(createTaskAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(resetState, () => initialState);
            // .addCase(getTaskStatussAsync.pending, (state) => {
            //     state.status = 'loading';
            // })
            // .addCase(getTaskStatussAsync.fulfilled, (state, action) => {
            //     state.status = 'idle';
            //     state.listStatus = action.payload;
            // })
            // .addCase(getTaskStatussAsync.rejected, (state) => {
            //     state.status = 'failed';
            // })
    },
});
export const getTaskItemtList = (state: RootState) => state.taskSate.tasItemList;
export const getTaskDetailstList = (state: RootState) => state.taskSate.task;
export const getStatus = (state: RootState) => state.taskSate.status;
// export const getStatusTask = (state: RootState) => state.taskSate.listStatus;

export default taskItemSlice.reducer;