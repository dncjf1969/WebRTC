import axios from "../common/http-common";

function WaitingListCard({ room }) {
  // room에서 꺼낼수 있는 정보
  // exitPassword: false
  // job: "IT"
  // manager: "홍길동이다"
  // memberCount: 1
  // memberMax: 6
  // message: null
  // name: "sdffsd"
  // roomId: 8
  // statusCode: null
  // type: "인성"

  console.log("들어옴");
  const handleEnter = async () => {
    await axios
      .get(`/room/waiting/enter?password=&roomId=${parseInt(room.roomId)}`, {
        headers: {
          Authorization: window.localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res);

        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };
  return (
    <div
      className="pt-3 pb-3  px-4 flex flex-col items-center  "
      data-aos="zoom-y-out"
      data-aos-delay="350"
    >
      <div className="pt-5 pb-5 max-w-6xl px-4 sm:px-6 ">
        {/* <WaitingListItem /> */}

        <div class="bg-gray-100 rounded w-48 shadow-xl rounded">
          <div class="max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer card">
            <div>
              <img
                src="https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_16-inch-Screen_10182021_big_carousel.jpg.large.jpg"
                alt=""
              />
            </div>
            <div class="py-4 px-4 bg-white">
              {/* <h3 class="text-md font-semibold text-gray-600">{data.name}</h3> */}
              <p class="mt-4 font-semibold text-gray-600 text-lg">
                {room.name}
              </p>
              <p class="mt-4 font-thin">비밀방 유무({room.exitPassword})</p>
              <span class="flex items-center justify-center mt-4 w-full bg-blue-400 hover:bg-blue-500 py-1 rounded">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <button onClick={handleEnter} class="font-semibold text-white">
                  참여하기
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingListCard;
