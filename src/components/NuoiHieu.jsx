import { motion } from 'framer-motion';
import { useLanguage } from '../App';
import { FaGem, FaCar, FaHome, FaHeart } from 'react-icons/fa';

const NuoiHieu = () => {
  const { lang } = useLanguage();

  const content = {
    vi: {
      title: "Dự Án \"Nuôi Hiếu\"",
      subtitle: "Chung tay xây dựng ước mơ cùng Hiếu",
      desc: "Chào mừng bạn đến với dự án \"Nuôi Hiếu\" – một sáng kiến nhằm giúp tôi thực hiện những ước mơ: sở hữu một căn biệt thự hoành tráng và một chiếc siêu xe bóng loáng. Mọi sự đóng góp của bạn, dù lớn hay nhỏ, đều là nguồn động viên to lớn để tôi tiếp tục theo đuổi con đường lập trình và sáng tạo.",
      donationTitle: "Thông tin donate",
      donationSubtitle: "Sự ủng hộ của bạn là nguồn động lực to lớn để mình tiếp tục sáng tạo và hoàn thiện những dự án chất lượng hơn.",
      packagesTitle: "Các Gói \"Nuôi\"",
      packagesSubtitle: "Chọn một gói để thấy sức ảnh hưởng trực tiếp từ đóng góp của bạn!",
      thankYou: "Lời Cảm Ơn",
      thankYouDesc: "Xin chân thành cảm ơn tấm lòng vàng của bạn. Sự ủng hộ của bạn là minh chứng rằng không có ước mơ nào là quá xa vời khi chúng ta cùng nhau chung sức.",
      packages: [
        {
          id: 1,
          name: "Gói \"Viên Gạch Xây Móng\"",
          price: "50.000 VNĐ",
          desc: "Xây dựng nền tảng vững chắc cho biệt thự tương lai.",
          icon: <FaHome size={30} />
        },
        {
          id: 2,
          name: "Gói \"Lốp Lăn Bánh\"",
          price: "100.000 VNĐ",
          desc: "Giúp siêu xe lăn bánh trên con đường chinh phục ước mơ.",
          icon: <FaCar size={30} />
        },
        {
          id: 3,
          name: "Gói \"Cất Nóc Nhà\"",
          price: "500.000 VNĐ",
          desc: "Cú hích quyết định để hoàn thiện mái ấm trong mơ.",
          icon: <FaGem size={30} />
        }
      ]
    },
    en: {
      title: "Project \"Nuôi Hiếu\"",
      subtitle: "Build Dreams Together with Hiếu",
      desc: "Welcome to Project \"Nuôi Hiếu\" – an initiative aimed at helping me realize my dreams: owning a grand villa and a sleek supercar. Every contribution, big or small, is a huge motivation for me to continue my coding and creative path.",
      donationTitle: "Donation Information",
      donationSubtitle: "All support is welcomed via the details below. Your name will be honored in our \"Wall of Fame\".",
      packagesTitle: "\"Support\" Packages",
      packagesSubtitle: "Choose a package to see the direct impact of your contribution!",
      thankYou: "A Big Thank You",
      thankYouDesc: "Sincerely thank you for your golden heart. Your support proves that no dream is too far when we stand together.",
      packages: [
        {
          id: 1,
          name: "\"Brick by Brick\" Package",
          price: "50,000 VNĐ",
          desc: "Building a solid foundation for the future villa.",
          icon: <FaHome size={30} />
        },
        {
          id: 2,
          name: "\"Rolling Wheels\" Package",
          price: "100,000 VNĐ",
          desc: "Helping the supercar roll towards the dream.",
          icon: <FaCar size={30} />
        },
        {
          id: 3,
          name: "\"Top the Roof\" Package",
          price: "500,000 VNĐ",
          desc: "The final push to complete the dream home.",
          icon: <FaGem size={30} />
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg)', color: 'white' }}>
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ padding: '60px 40px', borderRadius: '30px', textAlign: 'center', marginBottom: '40px' }}
        >
          <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '20px' }}>{t.title}</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            {t.desc}
          </p>
        </motion.div>

        {/* Donation Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '30px', marginBottom: '60px' }}>
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card"
                style={{ padding: '40px', borderRadius: '25px' }}
            >
                <h2 style={{ fontSize: '2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <FaHeart color="#ef4444" /> {t.donationTitle}
                </h2>
                <p style={{ color: '#aaa', marginBottom: '30px' }}>{t.donationSubtitle}</p>
                
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ margin: '5px 0', fontSize: '1.1rem' }}><strong>Bank:</strong> TECHCOMBANK</p>
                    <p style={{ margin: '5px 0', fontSize: '1.1rem' }}><strong>Account:</strong> 1903 7937 0140 17</p>
                    <p style={{ margin: '5px 0', fontSize: '1.1rem' }}><strong>Name:</strong> NGUYEN THO HIEU</p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card"
                style={{ padding: '20px', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
                {/* QR Code Placeholder */}
                <div style={{ width: '100%', maxWidth: '320px', background: '#fff', borderRadius: '15px', overflow: 'hidden', padding: '5px' }}>
                    <img 
                      src="/images/qr_donate.jpg" 
                      alt="QR Code Donate" 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>
                <p style={{ marginTop: '15px', color: '#888', fontSize: '0.9rem' }}>Quét mã để chuyển khoản nhanh</p>
            </motion.div>
        </div>

        {/* Packages */}
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>{t.packagesTitle}</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px' }}>{t.packagesSubtitle}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            {t.packages.map((pkg, index) => (
                <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card package-card"
                    style={{ padding: '40px 30px', borderRadius: '25px', textAlign: 'center', transition: 'transform 0.3s ease' }}
                >
                    <div style={{ color: 'var(--primary)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                        {pkg.icon}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{pkg.name}</h3>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px', height: '40px' }}>{pkg.desc}</p>
                    <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{pkg.price}</div>
                </motion.div>
            ))}
        </div>

        {/* Thank You Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ padding: '40px', borderRadius: '25px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{t.thankYou}</h2>
          <p style={{ color: '#ccc', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            {t.thankYouDesc}
          </p>
        </motion.div>

      </section>
    </div>
  );
};

export default NuoiHieu;
