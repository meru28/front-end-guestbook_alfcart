import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "reactstrap";
import { FiXCircle } from "react-icons/fi";
import "../support/css/main.css";
import "../support/css/util.css";
import SearchBox from "./SearchBox";
import ModalEditTamu from "./ModalEditTamu";

class DaftarTamu extends Component {
  state = {
    searchQuery: "",
    dataTamu: [],
    searchTamu: [],
    listPage: [],
    currentPage: 1,
    tampilPerPage: 5
  };

  componentDidMount = () => {
    this.getListTamu();
  };

  getListTamu = () => {
    axios
      .get("http://localhost:1990/api/get_guest")
      .then(res => {
        console.log(res);
        this.setState({ dataTamu: res.data, searchTamu: res.data });
      })
      .catch(err => console.log(err));
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
    if (query) {
      this.getPageData();
    } else {
      this.setState({ searchTamu: this.state.dataTamu });
    }
  };

  getPageData = () => {
    const { dataTamu: semuaTamu, searchQuery } = this.state;

    let arrSearch = semuaTamu;
    if (searchQuery)
      arrSearch = this.state.dataTamu.filter(
        item =>
          item.nama_tamu.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          item.alamat.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    this.setState({ searchTamu: arrSearch });
  };

  onBtnDeleteClick = id => {
    if (window.confirm("Yakin hapus tamu ini?")) {
      axios
        .delete("http://localhost:1990/api/guest/" + id)
        .then(res => {
          this.getListTamu();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderPagination = () => {
    var totalPage = Math.ceil(
      this.state.dataTamu.length / this.state.tampilPerPage
    );
    for (let i = 0; i < totalPage; i++) {
      this.state.listPage[i] = i + 1;
    }
    var listPaginationJSX = this.state.listPage.map(item => {
      return (
        <ul key={item}>
          <li
            className="page-item"
            onClick={() => this.setState({ currentPage: item })}
          >
            <a className="page-link" href="#">
              {item}
            </a>
          </li>
        </ul>
      );
    });
    return listPaginationJSX;
  };

  renderListTamu = () => {
    moment.locale("id");
    var { currentPage, tampilPerPage } = this.state;
    var listTamuJSX = this.state.searchTamu
      .slice((currentPage - 1) * tampilPerPage, currentPage * tampilPerPage)
      .map(item => {
        return (
          <tr key={item.id_tamu}>
            <th scope="row" style={{ textAlign: "center" }}>
              {item.id_tamu}
            </th>
            <td className="column1">{item.nama_tamu}</td>
            <td className="column2">{item.jenis_kelamin}</td>
            <td className="column3">{item.email}</td>
            <td className="column3">{item.alamat}</td>
            <td className="column3">{item.pesan}</td>
            <td className="column6">{moment(item.tanggal).format("ll")}</td>
            <td className="column0">
              <ModalEditTamu modalData={item} />
            </td>
            <td className="column0">
              <Button
                color="danger"
                size="sm"
                onClick={() => this.onBtnDeleteClick(item.id_tamu)}
              >
                <FiXCircle />
              </Button>
            </td>
          </tr>
        );
      });
    return listTamuJSX;
  };

  render() {
    const { searchQuery } = this.state;
    const totalCount = this.state.searchTamu.length;
    return (
      <div>
        <div className="limiter">
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100">
                <div className="col-lg-12 text-center">
                  <h2
                    className="section-heading text-capitalize"
                    style={{ fontWeight: "bold", marginTop: "-99px" }}
                  >
                    Daftar Tamu
                  </h2>
                </div>
                <br />
                <br />
                <h5 style={{ color: "gray" }}>
                  Total Tamu sejumlah: {totalCount}
                </h5>
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                <table>
                  <thead>
                    <tr className="table100-head">
                      <th className="column0">No</th>
                      <th className="column1">Nama Tamu</th>
                      <th className="column2">Jenis Kelamin</th>
                      <th className="column3">Email</th>
                      <th className="column3">Alamat</th>
                      <th className="column3">Pesan</th>
                      <th className="column6">Tanggal</th>
                      <th className="column0">Edit</th>
                      <th className="column0">Delete</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderListTamu()}</tbody>
                </table>
                <br />
                <div className="row justify-content-md-center">
                  {/* pagination */}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      {this.renderPagination()}
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DaftarTamu;
