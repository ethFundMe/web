// interface SeoProps {
//   name: string;
//   goal: string;
//   title: string;
//   description: string;
// }
export function seoCampaign(
  namee: string,
  goal: string,
  titlee: string,
  description: string,
  imgUrl: string
) {
  const title = titlee.toUpperCase();
  const name = namee.toUpperCase();

  const number = 160 + name.length * 17;
  const formattedTitle = [];
  let currentLineLength = 0,
    wordCount = 0;

  let background = 'SEO-Background_ffveye';
  let descripSpacing = '888',
    goalPosition = '110',
    titlePosition = '696';
  if (title.length <= 25) {
    (background = 'SEO-SINGLE-LINE_ujj2ir'),
      (descripSpacing = '912'),
      (goalPosition = '242'),
      (titlePosition = '820');
  }
  const isVerified = true,
    link1 =
      'https://res.cloudinary.com/dg68lnbnq/image/fetch/c_fill,h_1062,w_1653/l_' +
      background +
      '/c_fill,h_1062,w_1653/fl_layer_apply/co_rgb:a6a6a6,l_text:Mona-Sans-BoldWide.ttf_29_bold_normal_left:';
  const link3 =
      '/co_rgb:a6a6a6,l_text:Mona-Sans-BoldWide.ttf_46_bold_normal_left:',
    linkk =
      '/fl_layer_apply,g_west,x_159,y_' +
      goalPosition +
      '/co_rgb:FFFFFF,' +
      /*"w_1430,c_fit,"+*/ 'l_text:Mona-Sans-BoldWide.ttf_85_bold_normal_left_line_spacing_20:';
  const link4 =
    '/fl_layer_apply,g_north_west,x_120,y_' +
    titlePosition +
    '/co_rgb:FFFFFF,w_1400,c_fit,l_text:Mona-Sans-RegularWide.ttf_25_bold_normal_left_line_spacing_6:';

  for (const word of title.split(' ')) {
    if (currentLineLength + word.length > 25) {
      if (wordCount < 7) {
        formattedTitle.push('%0A');
        (currentLineLength = 0), (background = 'SEO-Background_ffveye');
      } else {
        break;
      }
    }
    formattedTitle.push(word.trim());
    currentLineLength += word.length;

    if (currentLineLength < 25 && wordCount < 13) {
      formattedTitle.push(' '), (currentLineLength += 1);
    }
    wordCount += 1;
  }

  const BrokenTitle = formattedTitle.join('').trim();
  let truncatedTitle, link2, link5;

  if (title.length > BrokenTitle.length) {
    truncatedTitle = BrokenTitle + '. . .';
  } else {
    truncatedTitle = BrokenTitle;
  }
  if (isVerified == true) {
    link2 = '/fl_layer_apply,g_west,x_120,y_-260';
    link5 =
      '/fl_layer_apply,g_north_west,x_120,y_' +
      descripSpacing +
      '/l_michael-dam-mEZ3PoFGs_k-unsplash_rgb9tc/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_142/l_verified_xcic9g/c_scale,w_40/e_mask,fl_layer_apply,g_north_west,x_' +
      number +
      ',y_250/https://res.cloudinary.com/dado30t6k/image/upload/v1707914942/campaign_media/igifqk9qqdxhjw66okkv.jpg';
  } else if (isVerified == false) {
    link5 =
      '/fl_layer_apply,g_north_west,x_120,y_' +
      descripSpacing +
      `/l_michael-dam-mEZ3PoFGs_k-unsplash_rgb9tc/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_82/l_Eth-Logo-50_tweu9l/c_scale,w_27/e_mask,fl_layer_apply,g_west,x_122,y_110/l_Logo-30_bal9yx/c_scale,w_150/fl_layer_apply,g_east,x_75,y_330/${imgUrl}`;
  }

  function Description(descript: string) {
    const words = descript.split(' ');
    if (words.length <= 52) {
      return descript;
    }
    const slicedWords = words.slice(0, 51);
    return slicedWords.join(' ') + '. . .';
  }
  const shortDescription = Description(description);

  const combinedMessage =
    link1 +
    encodeURIComponent(encodeURIComponent(name)) +
    link2 +
    link3 +
    encodeURIComponent(encodeURIComponent(goal)) +
    linkk +
    encodeURIComponent(encodeURIComponent(truncatedTitle)) +
    link4 +
    encodeURIComponent(encodeURIComponent(shortDescription)) +
    link5;

  function replaceCharacter(str: string, charToReplace: string) {
    return str.replaceAll(charToReplace, '%0A');
  }
  const refinedcombMessage = replaceCharacter(combinedMessage, '%25250A');
  console.log(refinedcombMessage);

  return refinedcombMessage;
}

export function seoProfile(fullName: string, bio: string, campaigns: string) {
  const name = fullName.toUpperCase();
  const isVerified = true;
  let isVerifX = 20;
  const isVeriff = 251;
  const nameY = '250';
  const profileY = '70';
  const descripY = '842';
  const descripWidth = '1200';

  if (bio.length > 188) {
    const words = bio.split(' ');
    while (bio.length > 188 && words.length > 1) {
      words.pop();
      bio = words.join(' ') + ' .  .  .';
    }
  }
  if (campaigns == '0') {
    campaigns = 'NO ';
  }

  const link1 =
    'https://res.cloudinary.com/dg68lnbnq/image/upload/co_rgb:FFFFFF,c_fit,l_text:Mona-Sans-BoldWide.ttf_83_bold_normal_left_line_spacing_14:' +
    encodeURIComponent(encodeURIComponent(cutAndAddEllipsis(name)));
  const link2 =
    ',$lineHeight_h/fl_layer_apply,g_west,x_106,y_' +
    nameY +
    '/co_rgb:FFFFFF,w_' +
    descripWidth +
    ',c_fit,l_text:Mona-sans-RegularWide.ttf_25_bold_normal_left_line_spacing_5:' +
    encodeURIComponent(encodeURIComponent(bio));
  const link3 =
    '/fl_layer_apply,g_north_west,x_108,y_' +
    descripY +
    '/co_rgb:a6a6a6,w_900,c_fit,l_text:Mona-sans-BoldWide.ttf_29_normal_left:' +
    encodeURIComponent(encodeURIComponent(campaigns + ' ACTIVE CAMPAIGNS'));
  let link4 = ' ';

  if (isVerified == true) {
    link4 =
      '/fl_layer_apply,g_west,x_158,y_399/l_verified_xcic9g/c_scale,w_88/e_mask,fl_layer_apply,g_west,y_' +
      isVeriff +
      ',x_' +
      isVerifX +
      '/l_gaffvubpchmdfgimfhdw/c_scale,w_200/fl_layer_apply,g_west,x_100,y_' +
      profileY +
      '/SEO-USER_BG_yurvdq.jpg';
  } else if (isVerified == false) {
    link4 =
      '/fl_layer_apply,g_west,x_158,y_399/l_gaffvubpchmdfgimfhdw/c_scale,w_200/fl_layer_apply,g_west,x_100,y_' +
      profileY +
      '/SEO-USER_BG_yurvdq.jpg';
  }

  function cutAndAddEllipsis(str: string) {
    if (str.length <= 20) {
      isVerifX = 61 + name.length * 60;

      return str;
    } else {
      // Slice the array to get the first 51 words
      const slicedTitle = str.slice(0, 20);
      // Join the sliced words back into a string and add ellipsis
      isVerifX = 1380;
      /*(name.length * 56)*/
      console.log('More than 20' + name.length);
      return slicedTitle + ' .  .  .';
    }
  }
  const combinedMessage = link1 + link2 + link3 + link4;
  // console.log(combinedMessage);
  return combinedMessage;
}
