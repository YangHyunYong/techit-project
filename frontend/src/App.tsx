import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import MyNft from "./pages/MyNft"
import SaleNft from "./pages/SaleNft"

const App:FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/my-nft" element={<MyNft />} />
          <Route path="/sale-nft" element={<SaleNft />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App