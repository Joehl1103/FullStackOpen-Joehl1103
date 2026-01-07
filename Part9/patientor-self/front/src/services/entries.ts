import axios from "axios";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";

function addEntry(object: Entry, id: string) {
  axios.post(`${apiBaseUrl}/entries/${id}`);
};

export default {
  addEntry
}

