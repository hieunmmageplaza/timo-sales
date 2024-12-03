export function formatDateFields(data) {
  const fields = Object.keys(data);
  fields.forEach(field => {
    if (data[field] && data[field].toDate && data[field].toDate()) {
      data[field] = data[field].toDate();
    }
  });
  return data;
}

export function presentDataFromDoc(doc, ...presenters) {
  if (!doc || !doc.exists) {
    return null;
  }
  let data = {id: doc.id, _id: doc.id, ...doc.data()};

  while (presenters.length) {
    const handler = presenters.shift();
    data = handler(data);
  }

  return data;
}

export function presentDataAndFormatDate(doc, ...presenters) {
  return presentDataFromDoc(doc, formatDateFields, ...presenters);
}

export function handleCondition(conditions = {}, queriedRef) {
  if (conditions.equal) {
    Object.keys(conditions.equal).forEach(key => {
      queriedRef = queriedRef.where(key, '==', conditions[key]);
    });
  }

  if (conditions.in) {
    Object.keys(conditions.in).forEach(key => {
      queriedRef = queriedRef.where(key, 'in', conditions.in[key]);
    });
  }

  return queriedRef;
}
