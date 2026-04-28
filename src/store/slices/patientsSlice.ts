import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientsState, ViewMode } from '../../types';
import { MOCK_PATIENTS } from '../../utils/mockData';

const initialState: PatientsState = {
  patients: MOCK_PATIENTS,
  viewMode: 'grid',
  filterDepartment: 'All',
  filterStatus: 'All',
  searchQuery: '',
  loading: false,
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    setFilterDepartment(state, action: PayloadAction<string>) {
      state.filterDepartment = action.payload;
    },
    setFilterStatus(state, action: PayloadAction<string>) {
      state.filterStatus = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setViewMode, setFilterDepartment, setFilterStatus, setSearchQuery } = patientsSlice.actions;
export default patientsSlice.reducer;
