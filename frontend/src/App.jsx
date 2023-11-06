import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AddQues from "./pages/addQues";
import UpdateQues from "./pages/updateQues";
import ViewQues from "./pages/viewQues";
import DeleteQues from "./pages/deleteQues";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions/add" element={<AddQues />} />
      <Route path="/questions/update/:questionId" element={<UpdateQues />} />
      <Route path="/questions/details/:questionId" element={<ViewQues />} />
      <Route path="/questions/delete/:questionId" element={<DeleteQues />} />
    </Routes>
  );
};
export default App;
