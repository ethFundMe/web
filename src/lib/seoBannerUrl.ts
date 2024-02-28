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
  imageURL: string,
  profileImage: string
) {
  const title = titlee.toUpperCase(),
    name = namee.toUpperCase();

  const encodedUrl = btoa(profileImage);
  const number = 115;

  const formattedTitle = [];
  let currentLineLength = 0,
    wordCount = 0;

  let Background = 'SEO-Background_ffveye',
    DescripSpacing = '888',
    goalPosition = '110',
    titlePosition = '696';
  if (title.length <= 25) {
    (Background = 'SEO-SINGLE-LINE_ujj2ir'),
      (DescripSpacing = '912'),
      (goalPosition = '242'),
      (titlePosition = '820');
  }
  const isVerified = false,
    link1 =
      'https://res.cloudinary.com/dg68lnbnq/image/fetch/c_fill,h_1062,w_1653/l_' +
      Background +
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
      if (wordCount < 5) {
        formattedTitle.push('%0A');
        (currentLineLength = 0), (Background = 'SEO-Background_ffveye');
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
  if (isVerified) {
    link2 = '/fl_layer_apply,g_west,x_165,y_-260';
    link5 =
      '/fl_layer_apply,g_north_west,x_120,y_' +
      DescripSpacing +
      '/l_fetch:' +
      encodedUrl +
      '/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_142/l_verified_xcic9g/c_scale,w_40/e_mask,fl_layer_apply,g_north_west,x_' +
      number +
      ',y_250/';
  } else {
    link2 = '/fl_layer_apply,g_west,x_115,y_-260';
    link5 =
      '/fl_layer_apply,g_north_west,x_120,y_' +
      DescripSpacing +
      '/l_fetch:' +
      encodedUrl +
      '/c_thumb,g_face,h_89,w_87/r_max/f_auto/fl_layer_apply,g_north_west,x_120,y_142/';
  }

  function Description(descript: string) {
    const words = descript.split(' ');
    if (words.length <= 38) {
      return descript;
    }
    const slicedWords = words.slice(0, 37);
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
    link5 +
    imageURL;

  function replaceCharacter(str: string, charToReplace: string) {
    return str.replaceAll(charToReplace, '%0A');
  }
  const refinedcombMessage = replaceCharacter(combinedMessage, '%25250A');
  console.log(refinedcombMessage);
  console.log(name.length);
  return refinedcombMessage;
}

export function seoProfile(
  profileImage: string,
  fullName: string,
  bio: string,
  campaigns: string
) {
  const name = fullName.toUpperCase();
  const isVerified = true;
  const isVerifX = 98;
  const isVeriff = 251;
  const nameY = '250';
  const profileY = '70';
  const descripY = '842';
  const descripWidth = '1200';
  let encodedUrl = btoa(profileImage);

  if (profileImage) {
    encodedUrl = btoa(profileImage);
  } else {
    encodedUrl = btoa(
      'https://res.cloudinary.com/dg68lnbnq/image/upload/v1705496998/gaffvubpchmdfgimfhdw.png'
    );
  }

  if (!bio) {
    bio = 'no bio yet';
  }

  if (!campaigns) {
    campaigns = 'NO';
  }

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
    ',$lineHeight_h/fl_layer_apply,g_west,x_186,y_' +
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
      '/l_fetch:' +
      encodedUrl +
      '/t_Profile,w_200/fl_layer_apply,g_west,x_100,y_' +
      profileY +
      '/SEO-USER_BG_yurvdq.jpg';
  } else if (isVerified == false) {
    link4 =
      '/fl_layer_apply,g_west,x_158,y_399/l_fetch:' +
      encodedUrl +
      '/t_Profile,w_200/fl_layer_apply,g_west,x_100,y_' +
      profileY +
      '/SEO-USER_BG_yurvdq.jpg';
  }

  function cutAndAddEllipsis(str: string) {
    if (str.length <= 20) {
      return str;
    } else {
      const slicedTitle = str.slice(0, 20);
      console.log('More than 20' + name.length);
      return slicedTitle + ' .  .  .';
    }
  }
  const combinedMessage = link1 + link2 + link3 + link4;
  console.log(combinedMessage);
  return combinedMessage;
}
