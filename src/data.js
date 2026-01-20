export const content = {
  vi: {
    hero: {
      greeting: "Xin chào, tôi là",
      role: "Lập trình viên & Kỹ sư phần mềm",
      cta: "Xem dự án",
      about: "Tôi là một người đam mê sáng tạo và luôn tìm kiếm sự hoàn hảo. Với tư duy cởi mở và tinh thần trách nhiệm cao, tôi luôn nỗ lực không ngừng để mang lại những giá trị tốt nhất. Tôi yêu thích việc giải quyết các vấn đề khó, luôn sẵn sàng học hỏi cái mới và chia sẻ kiến thức với mọi người xung quanh."
    },
    profile: {
      birthday: "19/06/2000",
      hometown: "Nam Định (nay là Ninh Bình)",
      education: "Tốt nghiệp Đại học Điện lực chuyên ngành Công nghệ phần mềm",
      email: "hieulatoi1962@gmail.com"
    },
    nav: {
      home: "Trang chủ",
      skills: "Kỹ năng",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      awards: "Giải thưởng",
      contact: "Liên hệ",
      nuoiHieu: "Nuôi Hiếu"
    },
    skills: {
      title: "Kỹ Năng Chuyên Môn",
      viewAll: "Xem tất cả kỹ năng",
      more: "Và nhiều hơn thế nữa...",
      items: [
        { name: "PHP", level: "90%" },
        { name: "Laravel", level: "85%" },
        { name: "MySQL", level: "85%" },
        { name: "Redis", level: "60%" },
        { name: "Git", level: "85%" },
        { name: "Node.js", level: "60%" },
        { name: "ReactJS", level: "60%" },
        { name: "VueJS", level: "60%" },
        { name: "Angular", level: "60%" },
        { name: "HTML", level: "90%" },
        { name: "CSS", level: "85%" },
        { name: "Java", level: "65%" },
        { name: "Python", level: "60%" },
        { name: "Docker", level: "55%" },
        { name: "Vercel", level: "70%" },
        { name: "GMO API", level: "75%" },
        { name: "OpenAI API", level: "60%" },
        { name: "Gemini API", level: "60%" }
      ]
    },
    experience: {
      title: "Kinh Nghiệm Làm Việc",
      items: [
        {
          company: 'VNPT',
          link: 'https://vnpt.com.vn',
          role: 'Developer',
          period: '10/2025 - Hiện tại',
          description: 'Phát triển các hệ thống lớn cho dịch vụ tổng đài viễn thông.'
        },
        {
          company: 'Newwave Solutions',
          link: 'https://newwavesolution.com',
          role: 'Developer',
          period: '07/2022 - 10/2025',
          description: 'Đạt giải thưởng MVP 08/2023 và Dự án của năm 01/2025.'
        },
        {
          company: 'SmartOSC',
          link: 'https://www.smartosc.com',
          role: 'Developer',
          period: '01/2022 - 06/2022',
          description: 'Bắt đầu sự nghiệp với vai trò Developer.'
        }
      ]
    },
    awards: {
      title: "Thành Tựu & Giải Thưởng",
      items: [
        {
          title: "Project of the Year",
          date: "01/2025",
          issuer: "Newwave Solutions",
          desc: "Giải thưởng cho dự án xuất sắc nhất năm.",
          image: "/images/poy.jpg"
        },
        {
          title: "MVP - Most Valuable Player",
          date: "08/2023",
          issuer: "Newwave Solutions",
          desc: "Nhân viên xuất sắc nhất tháng.",
          image: "/images/mvp.jpg"
        }
      ]
    },
    projects: {
      title: "Dự Án Nổi Bật",
      detailTitle: "Chi tiết dự án",
      viewDetails: "Xem chi tiết",
      groups: [
        {
          company: "VNPT",
          items: [
             {
              title: 'Hệ thống tổng đài IPCC VOICE',
              desc: 'Hỗ trợ giao tiếp giữa khách hàng và điện thoại viên, quản lý chấm công, công việc và gói cước.',
              tech: ['PHP', 'Python', 'VueJS', 'Java'],
              details: "- Xây dựng module quản lý chấm công và phân công công việc tự động cho điện thoại viên.\n- Phát triển các API giao tiếp thời gian thực giữa khách hàng và tổng đài sử dụng WebSocket.\n- Tích hợp hệ thống quản lý gói cước và tính cước tự động.\n- Tối ưu hóa hiệu năng xử lý cuộc gọi đồng thời lượng lớn."
            },
            {
              title: 'Hệ thống quản lý biển báo điện tử',
              desc: 'Quản lý hệ thống biển báo, bảng quảng cáo và phát trực tiếp nội dung trên biển quảng cáo.',
              tech: ['NodeJS (NestJS)', 'Angular'],
              details: "- Thiết kế và phát triển sử dụng NestJS để quản lý hàng nghìn thiết bị biển báo từ xa.\n- Xây dựng tính năng phát trực tiếp (Live Streaming) nội dung quảng cáo với độ trễ thấp.\n- Phát triển module lập lịch phát quảng cáo thông minh.\n- Xây dựng giao diện quản trị Admin Dashboard bằng Angular."
            }
          ]
        },
        {
          company: "Newwave Solutions",
          items: [
            {
              title: 'MAG Kaijimeiku',
              desc: 'Sàn TMĐT thời trang Nhật Bản tích hợp thanh toán Amazon Pay.',
              tech: ['Laravel', 'MySQL', 'GMO', 'Amazon Pay'],
              details: "- Tham gia phát triển Core hệ thống E-commerce phục vụ thị trường Nhật Bản.\n- Tích hợp cổng thanh toán GMO và Amazon Pay đảm bảo bảo mật giao dịch cao.\n- Xây dựng hệ thống quản lý đơn hàng (OMS) và kho hàng (Inventory).\n- Tối ưu truy vấn MySQL cho các báo cáo doanh thu phức tạp."
            },
            {
              title: 'MAG Paper',
              desc: 'Ứng dụng in ảnh xử lý PDF Toolbox.',
              tech: ['CakePHP', 'PDF Toolbox'],
              details: "- Xây dựng module xử lý file PDF tự động, căn chỉnh kích thước in ấn chính xác.\n- Tích hợp PDF Toolbox để merge, split và convert định dạng file.\n- Phát triển luồng đặt hàng in ấn và theo dõi trạng thái đơn in.\n- Maintain và nâng cấp hệ thống sử dụng CakePHP."
            },
            {
              title: 'QI-Cafe',
              desc: 'Hệ thống đặt phòng trực tuyến đa múi giờ.',
              tech: ['Laravel', 'MySQL', 'JavaScript'],
              details: "- Giải quyết bài toán xử lý Đặt phòng (Booking) với logic đa múi giờ phức tạp.\n- Xây dựng thuật toán kiểm tra phòng trống (Availability Check) tối ưu.\n- Phát triển tính năng email notification và reminder tự động cho khách hàng."
            },
            {
              title: 'MAG ChatBot',
              desc: 'Chatbot AI hỗ trợ khách hàng tích hợp ChatGPT API.',
              tech: ['PHP', 'ChatGPT API'],
              details: "- Tích hợp OpenAI API (ChatGPT) để tự động trả lời câu hỏi thường gặp của khách hàng.\n- Xây dựng luồng training data để chatbot hiểu rõ hơn về sản phẩm/dịch vụ của công ty.\n- Phát triển tính năng chuyển tiếp chat cho nhân viên (Human Handover) khi AI không xử lý được."
            },
            {
              title: 'WeLaunch',
              desc: 'Hệ thống CRM và quản lý công việc cho Agency.',
              tech: ['Laravel', 'VueJS', 'MySQL'],
              details: "- Phát triển hệ thống CRM quản lý Lead, Deal và Customer Lifecycle.\n- Xây dựng module Kanban Board để quản lý tiến độ công việc (tương tự Trello, Jira).\n- Tích hợp tính năng báo cáo, biểu đồ thống kê hiệu suất làm việc của nhân viên."
            },
            {
              title: 'MAG NFT',
              desc: 'Sàn giao dịch NFT.',
              tech: ['Laravel', 'MariaDB'],
              details: "- Xây dựng Frontend Marketplace sử dụng ReactJS với trải nghiệm người dùng mượt mà.\n- Tích hợp Ví điện tử (Wallet Connect) để giao dịch NFT.\n- Xử lý dữ liệu thời gian thực cho các phiên đấu giá (Auction)."
            },
            {
              title: 'MAG OriLab',
              desc: 'Sàn thương mại điện tử sản phẩm thiết kế cá nhân hóa.',
              tech: ['PHP', 'MySQL', 'ReactJS'],
              details: "- Phát triển tính năng cho phép người dùng tùy chỉnh sản phẩm (Custom Product Design) ngay trên web.\n- Xây dựng luồng logic tính giá động dựa trên các option tùy chọn của sản phẩm."
            }
          ]
        },
        {
          company: "SmartOSC",
          items: [
            {
              title: '7 Eleven Sub',
              desc: 'Hệ thống đặt đồ ăn cho chuỗi 7-Eleven Nhật Bản.',
              tech: ['Magento'],
              details: "- Phát triển module đặt đồ ăn (Food Ordering) trên nền tảng Magento.\n- Tối ưu quy trình Checkout để xử lý lượng lớn đơn hàng trong giờ cao điểm.\n- Tích hợp hệ thống Loyalty Points (Tích điểm đổi quà) cho thành viên."
            }
          ]
        }
      ]
    },
    footer: "Copyright © 2026 HieuNguyen. All Rights Reserved",
    search: {
      title: "Tìm kiếm",
      subtitle: "Sử dụng sức mạnh của Google Search API",
      placeholder: "Nhập từ khóa tìm kiếm",
      button: "Tìm kiếm",
      loading: "Đang tìm kiếm...",
      noResults: "Không tìm thấy kết quả nào.",
      error: "Đã xảy ra lỗi khi tìm kiếm.",
      prev: "Trước",
      next: "Sau"
    }
  },
  en: {
    hero: {
      greeting: "Hello, I'm",
      role: "Backend Developer & Software Engineer",
      cta: "View Projects",
      about: "I am a passionate creator who always strives for perfection. With an open mind and a strong sense of responsibility, I continuously endeavor to deliver the best value. I love solving difficult problems, am always ready to learn new things, and enjoy sharing knowledge with those around me."
    },
    profile: {
      birthday: "June 19, 2000",
      hometown: "Nam Dinh (now Ninh Binh)",
      education: "Graduated from Electric Power University - Major: Software Engineering",
      email: "hieulatoi1962@gmail.com"
    },
    nav: {
      home: "Home",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      awards: "Awards",
      contact: "Contact",
      nuoiHieu: "Nuôi Hiếu"
    },
    skills: {
      title: "Technological Arsenal",
      viewAll: "View All Skills",
      more: "And much more...",
      items: [
        { name: "PHP", level: "90%" },
        { name: "Laravel", level: "85%" },
        { name: "MySQL", level: "85%" },
        { name: "Redis", level: "60%" },
        { name: "Git", level: "85%" },
        { name: "Node.js", level: "60%" },
        { name: "ReactJS", level: "60%" },
        { name: "VueJS", level: "60%" },
        { name: "Angular", level: "60%" },
        { name: "HTML", level: "90%" },
        { name: "CSS", level: "85%" },
        { name: "Java", level: "65%" },
        { name: "Python", level: "60%" },
        { name: "Docker", level: "55%" },
        { name: "Vercel", level: "70%" },
        { name: "GMO API", level: "75%" },
        { name: "OpenAI API", level: "60%" },
        { name: "Gemini API", level: "60%" }
      ]
    },
    experience: {
      title: "Work Experience",
      items: [
        {
          company: 'VNPT',
          link: 'https://vnpt.com.vn',
          role: 'Backend Developer',
          period: '10/2025 - Present',
          description: 'Developing major systems for telecommunication switchboard services.'
        },
        {
          company: 'Newwave Solutions',
          link: 'https://newwavesolution.com',
          role: 'Backend Developer',
          period: '07/2022 - 10/2025',
          description: 'Awarded MVP 08/2023 and Project of the Year 01/2025.'
        },
        {
          company: 'SmartOSC',
          link: 'https://www.smartosc.com',
          role: 'Backend Developer',
          period: '01/2022 - 06/2022',
          description: 'Started career as a Developer.'
        }
      ]
    },
    awards: {
      title: "Honors & Awards",
      items: [
        {
          title: "Project of the Year",
          date: "01/2025",
          issuer: "Newwave Solutions",
          desc: "Award for the most outstanding project of the year.",
          image: "/images/poy.jpg"
        },
        {
          title: "MVP - Most Valuable Player",
          date: "08/2023",
          issuer: "Newwave Solutions",
          desc: "Employee of the month award.",
          image: "/images/mvp.jpg"
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      detailTitle: "Detailed Info",
      viewDetails: "View Details",
      groups: [
        {
          company: "VNPT",
          items: [
             {
              title: 'IPCC VOICE Call Center',
              desc: 'Supports customer-operator communication, manages operator attendance/workflow and tariff packages.',
              tech: ['PHP', 'Python', 'VueJS', 'Java'],
              details: "- Built operator attendance and automatic task assignment modules.\n- Developed real-time communication APIs using WebSocket.\n- Integrated tariff package management and automated billing systems.\n- Optimized performance for handling high volumes of concurrent calls."
            },
            {
              title: 'Digital Signage Management System',
              desc: 'Manages electronic signs, billboards, and live streaming content on billboards.',
              tech: ['NodeJS (NestJS)', 'Angular'],
              details: "- Designed and developed using NestJS to manage thousands of remote signage devices.\n- Built low-latency Live Streaming features for ad content.\n- Developed smart ad scheduling modules.\n- Built Admin Dashboard interface using Angular."
            }
          ]
        },
        {
          company: "Newwave Solutions",
          items: [
            {
              title: 'MAG Kaijimeiku',
              desc: 'Japanese fashion e-commerce platform with Amazon Pay integration.',
              tech: ['Laravel', 'MySQL', 'GMO', 'Amazon Pay'],
              details: "- Developed Core E-commerce system serving the Japanese market.\n- Integrated GMO and Amazon Pay gateways ensuring high transaction security.\n- Built Order Management System (OMS) and Inventory Management.\n- Optimized MySQL queries for complex revenue reports."
            },
            {
              title: 'MAG Paper',
              desc: 'Photo printing application handling PDF toolboxes.',
              tech: ['CakePHP', 'PDF Toolbox'],
              details: "- Built automatic PDF processing module ensuring precise print dimensions.\n- Integrated PDF Toolbox to merge, split, and convert file formats.\n- Developed print ordering flow and order status tracking.\n- Maintained and upgraded system using CakePHP."
            },
            {
              title: 'QI-Cafe',
              desc: 'Multi-timezone online room booking system.',
              tech: ['Laravel', 'MySQL', 'JavaScript'],
              details: "- Solved complex multi-timezone Booking logic challenges.\n- Built optimized Availability Check algorithms.\n- Developed automated email notification and reminder features for customers."
            },
            {
              title: 'MAG ChatBot',
              desc: 'AI customer support bot integrated with ChatGPT API.',
              tech: ['PHP', 'ChatGPT API'],
              details: "- Integrated OpenAI API (ChatGPT) to automatically answer FAQs.\n- Built training data flows to help chatbot understand company products/services better.\n- Developed Human Handover feature when AI cannot resolve issues."
            },
            {
              title: 'WeLaunch',
              desc: 'CRM and task management system for Agencies.',
              tech: ['Laravel', 'VueJS', 'MySQL'],
              details: "- Developed CRM system managing Leads, Deals, and Customer Lifecycle.\n- Built Kanban Board module for task progress management (similar to Trello/Jira).\n- Integrated reporting and performance statistics charts."
            },
            {
              title: 'MAG NFT',
              desc: 'NFT trading marketplace.',
              tech: ['Laravel', 'MariaDB'],
              details: "- Built Marketplace Frontend using ReactJS with smooth UX.\n- Integrated Wallet Connect for NFT transactions.\n- Handled real-time data for Auctions."
            },
            {
              title: 'MAG OriLab',
              desc: 'Personalized design product marketplace.',
              tech: ['PHP', 'MySQL', 'ReactJS'],
              details: "- Developed features allowing Custom Product Design directly on web.\n- Built dynamic pricing logic based on product customization options."
            }
          ]
        },
        {
          company: "SmartOSC",
          items: [
            {
              title: '7 Eleven Sub',
              desc: 'Food ordering system for 7-Eleven Japan chain.',
              tech: ['Magento'],
              details: "- Developed Food Ordering module on Magento platform.\n- Optimized Checkout process to handle high order volumes during peak hours.\n- Integrated Loyalty Points system for members."
            }
          ]
        }
      ]
    },
    footer: "Copyright © 2026 HieuNguyen. All Rights Reserved",
    search: {
      title: "Search",
      subtitle: "Powered by Google Search API",
      placeholder: "Enter keywords",
      button: "Search",
      loading: "Searching...",
      noResults: "No results found.",
      error: "An error occurred while searching.",
      prev: "Prev",
      next: "Next"
    }
  }
};
