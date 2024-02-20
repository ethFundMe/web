// interface SeoProps {
//   name: string;
//   goal: string;
//   title: string;
//   description: string;
// }
export function seoCampaign(
  name: string,
  goal: number,
  title: string,
  description: string,
  imageUrl: string
) {
  const isVerified = true;

  let link2, link5;

  const link1 =
    'https://res.cloudinary.com/dg68lnbnq/image/fetch/c_fill,h_1062,w_1653/l_toacvtnrxuiya6obruwq/c_fill,h_1062,w_1653/fl_layer_apply/co_rgb:a6a6a6,l_text:Mona-Sans-BoldWide.ttf_29_bold_normal_left:';
  const link3 =
    '/fl_layer_apply,g_west,x_120,y_-286/co_rgb:a6a6a6,l_text:Mona-Sans-BoldWide.ttf_46_bold_normal_left:';
  const linkk =
    '/fl_layer_apply,g_west,x_159,y_110/co_rgb:FFFFFF,w_1430,c_fit,l_text:Mona-Sans-BoldWide.ttf_85_bold_normal_left_line_spacing_20:';
  const link4 =
    '/fl_layer_apply,g_west,x_120,y_245/co_rgb:FFFFFF,w_900,c_fit,l_text:Mona-Sans-RegularWide.ttf_25_bold_normal_left_line_spacing_6:';

  if (isVerified == true) {
    link2 =
      '/fl_layer_apply,g_west,x_158,y_-330/co_rgb:FFFFFF,l_text:Mona-Sans-MediumWide.ttf_29.8_bold_normal_left:SEEKS';
    link5 = `/fl_layer_apply,g_west,x_120,y_388/l_michael-dam-mEZ3PoFGs_k-unsplash_rgb9tc/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_82/l_verified_xcic9g/c_scale,w_40/e_mask,fl_layer_apply,x_-694,y_-330/l_Eth-Logo-50_tweu9l/c_scale,w_27/e_mask,fl_layer_apply,g_west,x_122,y_110/l_Logo-30_bal9yx/c_scale,w_150/fl_layer_apply,g_east,x_75,y_330/${imageUrl}`;
  } else if (isVerified == false) {
    link2 =
      '/fl_layer_apply,g_west,x_120,y_-330/co_rgb:FFFFFF,l_text:Mona-Sans-MediumWide.ttf_29.8_bold_normal_left:SEEKS';
    link5 = `/fl_layer_apply,g_west,x_120,y_388/l_michael-dam-mEZ3PoFGs_k-unsplash_rgb9tc/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_82/l_Eth-Logo-50_tweu9l/c_scale,w_27/e_mask,fl_layer_apply,g_west,x_122,y_110/l_Logo-30_bal9yx/c_scale,w_150/fl_layer_apply,g_east,x_75,y_330/${imageUrl}`;
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

export function seoProfile(name: string, bio: string, campaigns: string) {
  const isVerified = false;
  let number = 0;

  if (name.length < 14) {
    number = name.length * 13;
  }
  if (name.length > 16) {
    number = name.length * (name.length - 8);
  }

  // // Ensure name does not exceed 27 characters
  // if (name.length > 28) {
  //     let words = name.split(' ');
  //     while (name.length > 28 && words.length > 1) {
  //         words.pop();
  //         name = words.join(' ') + ". . .";
  //     }
  // }

  if (bio.length > 121) {
    const words = bio.split(' ');
    while (bio.length > 121 && words.length > 1) {
      words.pop();
      bio = words.join(' ') + '. . .';
    }
  }

  if (campaigns == '0') {
    campaigns = 'NO ';
  }

  const link1 =
    'https://res.cloudinary.com/dg68lnbnq/image/upload/co_rgb:FFFFFF,w_1300,c_fit,l_text:Mona-sans-BoldWide.ttf_83_bold_normal_left:' +
    encodeURIComponent(name);
  const link2 =
    '/fl_layer_apply,g_west,x_106,y_254/co_rgb:FFFFFF,w_900,c_fit,l_text:Mona-sans-RegularWide.ttf_25_bold_normal_left:' +
    encodeURIComponent(bio);
  const link3 =
    '/fl_layer_apply,g_west,x_108,y_352/co_rgb:a6a6a6,w_900,c_fit,l_text:Mona-sans-BoldWide.ttf_29_normal_left:' +
    encodeURIComponent(campaigns + 'ACTIVE CAMPAIGNS');
  let link4 = ' ';

  if (isVerified) {
    link4 =
      '/fl_layer_apply,g_west,x_158,y_395/l_verified_xcic9g/c_scale,w_88/e_mask,fl_layer_apply,g_center,y_250,x_' +
      number.toString() +
      '/l_gaffvubpchmdfgimfhdw/c_scale,w_200/fl_layer_apply,g_west,x_100,y_70/SEO-USER_BG_yurvdq.jpg';
  } else {
    link4 =
      '/fl_layer_apply,g_west,x_158,y_395/l_gaffvubpchmdfgimfhdw/c_scale,w_200/fl_layer_apply,g_west,x_100,y_70/SEO-USER_BG_yurvdq.jpg';
  }

  const combinedMessage = link1 + link2 + link3 + link4;
  // console.log(combinedMessage);
  return combinedMessage;
}
