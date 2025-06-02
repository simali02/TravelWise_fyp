const generateUniqueKey = (id) => {
    return `key_id_${Date.now()}_${crypto.randomUUID()}`;
  };

export default generateUniqueKey;