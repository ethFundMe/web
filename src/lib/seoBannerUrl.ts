// interface SeoProps {
//   name: string;
//   goal: string;
//   title: string;
//   description: string;
// }
export function seoBannerURL(
  name: string,
  goal: number,
  title: string,
  description: string
) {
  const isVerified = true;

  let link2, link5;

  const link1 =
    'https://res.cloudinary.com/dg68lnbnq/image/upload/u_wnq8dctwtnwcgcblm9h7/c_fill,h_1062,w_1653/fl_layer_apply/co_rgb:a6a6a6,l_text:Mona-Sans-BoldWide.ttf_29_bold_normal_left:';
  const link3 =
    '/fl_layer_apply,g_west,x_120,y_-286/co_rgb:a6a6a6,l_text:Mona-Sans-BoldWide.ttf_46_bold_normal_left:';
  const linkk =
    '/fl_layer_apply,g_west,x_159,y_110/co_rgb:FFFFFF,w_1430,c_fit,l_text:Mona-Sans-BoldWide.ttf_85_bold_normal_left_line_spacing_20:';
  const link4 =
    '/fl_layer_apply,g_west,x_120,y_245/co_rgb:FFFFFF,w_900,c_fit,l_text:Mona-Sans-RegularWide.ttf_25_bold_normal_left_line_spacing_6:';

  if (isVerified == true) {
    link2 =
      '/fl_layer_apply,g_west,x_158,y_-330/co_rgb:FFFFFF,l_text:Mona-Sans-MediumWide.ttf_29.8_bold_normal_left:SEEKS';
    link5 =
      '/fl_layer_apply,g_west,x_120,y_388/l_michael-dam-mEZ3PoFGs_k-unsplash_rgb9tc/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_82/l_verified_xcic9g/c_scale,w_40/e_mask,fl_layer_apply,x_-694,y_-330/l_Eth-Logo-50_tweu9l/c_scale,w_27/e_mask,fl_layer_apply,g_west,x_122,y_110/l_Logo-30_bal9yx/c_scale,w_150/fl_layer_apply,g_east,x_75,y_330/toacvtnrxuiya6obruwq.jpg';
  } else if (isVerified == false) {
    link2 =
      '/fl_layer_apply,g_west,x_120,y_-330/co_rgb:FFFFFF,l_text:Mona-Sans-MediumWide.ttf_29.8_bold_normal_left:SEEKS';
    link5 =
      '/fl_layer_apply,g_west,x_120,y_388/l_michael-dam-mEZ3PoFGs_k-unsplash_rgb9tc/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_82/l_Eth-Logo-50_tweu9l/c_scale,w_27/e_mask,fl_layer_apply,g_west,x_122,y_110/l_Logo-30_bal9yx/c_scale,w_150/fl_layer_apply,g_east,x_75,y_330/toacvtnrxuiya6obruwq.jpg';
  }

  if (title.length > 45) {
    const words = title.split(' ');

    while (title.length > 45 && words.length > 1) {
      words.pop();
      const Ttitle = words.join(' ');
      title = Ttitle + '. . .';
    }
  }

  if (description.length > 145) {
    const words = description.split(' ');

    while (description.length > 145 && words.length > 1) {
      words.pop();
      const Ddescription = words.join(' ');
      description = Ddescription + '. . .';
    }
  }

  const combinedMessage =
    link1 +
    encodeURIComponent(name) +
    link2 +
    link3 +
    encodeURIComponent(encodeURIComponent(goal)) +
    linkk +
    encodeURIComponent(encodeURIComponent(title)) +
    link4 +
    encodeURIComponent(encodeURIComponent(description)) +
    link5;
  // console.log(combinedMessage);
  return combinedMessage;
}
