import { makeAutoObservable } from "mobx";
import axios from "axios";

class DataStore {
  data = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData() {
    try {
      const response = await axios.get("/mfr-list");
      this.data = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

const dataStore = new DataStore();
export default dataStore;
